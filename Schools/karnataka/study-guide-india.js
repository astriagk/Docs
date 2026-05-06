const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const BASE_URL = "https://www.studyguideindia.com";
const OUTPUT_FILE = "schools.json";
const CHECKPOINT_FILE = "study-guide-india.json";

const CONCURRENCY = 3;
const DELAY_MS = 500;

const http = axios.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Connection: "keep-alive",
  },
  timeout: 30000,
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Fetch (never throws) ─────────────────────────────────────────────────────
async function fetchHtml(url) {
  await sleep(DELAY_MS + Math.random() * 300);
  try {
    const { data } = await http.get(url);
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: `${err.response?.status ?? err.message}` };
  }
}

// ─── Collect all school links ─────────────────────────────────────────────────
const SCHOOL_LINK_RE = /^\/Schools\/[a-z0-9-]+_\d+\.html$/i;

async function getAllLinks() {
  const first = await fetchHtml(`${BASE_URL}/schools/schools-karnataka-ka.html`);
  if (!first.ok) { console.error("Failed page 1:", first.error); process.exit(1); }

  const $first = cheerio.load(first.data);

  let totalPages = 1;
  $first("a[href]").each((_, el) => {
    const m = ($first(el).attr("href") ?? "").match(/schools_karnataka-ka-(\d+)\.html/i);
    if (m) totalPages = Math.max(totalPages, parseInt(m[1], 10));
  });
  console.log(`Total listing pages: ${totalPages}`);

  const links = new Set();
  const collectFrom = ($) =>
    $("a[href]").each((_, el) => {
      const href = $(el).attr("href");
      if (SCHOOL_LINK_RE.test(href)) links.add(href);
    });

  collectFrom($first);

  for (let p = 2; p <= totalPages; p++) {
    const res = await fetchHtml(`${BASE_URL}/schools/schools_karnataka-ka-${p}.html`);
    if (res.ok) collectFrom(cheerio.load(res.data));
    else console.error(`\n  page ${p} failed: ${res.error}`);
    process.stdout.write(`\r  Listing pages: ${p}/${totalPages} | links: ${links.size}   `);
  }
  console.log();
  return [...links];
}

// ─── Scrape a single school ───────────────────────────────────────────────────
function clean(text) { return text.replace(/\s+/g, " ").trim(); }

async function scrapeSchool(link) {
  const url = BASE_URL + link;
  const res = await fetchHtml(url);
  if (!res.ok) {
    console.error(`\n  ✗ ${link}: ${res.error}`);
    return null;
  }

  const $ = cheerio.load(res.data);
  const result = { url, slug: link };

  // ── School Name: try h1 first, fall back to <title> ──────────────────────
  const h1Name = clean($("h1").first().text());
  const titleName = clean($("title").first().text().split("|")[0].split("-")[0]);
  result["School Name"] = h1Name || titleName || "";

  // ── Details table ─────────────────────────────────────────────────────────
  const detailsH2 = $("h2").filter((_, el) => /Details/i.test($(el).text())).first();
  const detailsTable = detailsH2.next("table");

  const parseTable = (tbl) => {
    $(tbl).find("tr").each((_, row) => {
      const cells = $(row).find("td, th");
      if (cells.length < 2) return;

      const label = clean($(cells[0]).text());
      if (!label) return;
      if (/^(School Name|Type|District|State)$/i.test(label)) return;

      const valueCell = $(cells[1]);
      let value = clean(valueCell.text());

      valueCell.find("a").each((_, a) => {
        const href = $(a).attr("href") ?? "";
        if (href.startsWith("mailto:")) {
          value = href.replace(/^mailto:/i, "").trim();
        } else if (href.startsWith("http") && !href.includes("studyguideindia.com")) {
          value = href.trim();
        }
      });

      result[label] = value;
    });
  };

  if (detailsTable.length) {
    parseTable(detailsTable);
  } else {
    // Fallback: scan all small tables
    $("table").each((_, tbl) => {
      if ($(tbl).find("tr").length > 8) return;
      parseTable(tbl);
    });
  }

  return Object.keys(result).length > 2 ? result : null;
}

// ─── Checkpoint helpers ───────────────────────────────────────────────────────
function loadCheckpoint() {
  if (!fs.existsSync(CHECKPOINT_FILE)) return { links: [], scraped: {}, skipped: [] };
  return JSON.parse(fs.readFileSync(CHECKPOINT_FILE, "utf8"));
}
function saveCheckpoint(data) {
  fs.writeFileSync(CHECKPOINT_FILE, JSON.stringify(data));
}

// ─── Worker pool ──────────────────────────────────────────────────────────────
async function runPool(items, workerFn, { concurrency = 3, onProgress } = {}) {
  const queue = [...items];
  let done = 0;
  async function worker() {
    while (queue.length) {
      const item = queue.shift();
      if (!item) break;
      await workerFn(item);
      done++;
      onProgress?.(done, items.length);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  let links;
  const cp = loadCheckpoint();

  if (cp.links?.length) {
    links = cp.links;
    console.log(`Loaded ${links.length} links from checkpoint`);
  } else {
    links = await getAllLinks();
    console.log(`Found ${links.length} school links`);
    saveCheckpoint({ links, scraped: {}, skipped: [] });
  }

  const scraped = cp.scraped ?? {};
  const skipped = new Set(cp.skipped ?? []);

  // Retry skipped ones too — process everything not yet scraped
  const todo = links.filter((l) => !scraped[l]);
  const total = links.length;

  console.log(`Already scraped: ${Object.keys(scraped).length} | Previously skipped (retrying): ${skipped.size} | Remaining: ${todo.length}\n`);

  // Clear skipped — re-add only ones that fail again this run
  skipped.clear();

  let lastSave = Date.now();

  await runPool(
    todo,
    async (link) => {
      const r = await scrapeSchool(link);
      if (r) {
        scraped[link] = r;
        skipped.delete(link);
      } else {
        skipped.add(link);
      }

      if (Object.keys(scraped).length % 25 === 0 || Date.now() - lastSave > 60_000) {
        saveCheckpoint({ links, scraped, skipped: [...skipped] });
        lastSave = Date.now();
      }
    },
    {
      concurrency: CONCURRENCY,
      onProgress: (done, remaining) => {
        const pct = (((total - remaining + done) / total) * 100).toFixed(1);
        process.stdout.write(`\r  ✓ ${done}/${remaining} this run | ${pct}% overall   `);
      },
    }
  );

  saveCheckpoint({ links, scraped, skipped: [...skipped] });

  const results = Object.values(scraped).filter(Boolean);
  console.log(`\n\nScraped: ${results.length} | Skipped: ${skipped.size} | Total: ${total}`);

  // Print all unique field names found
  const allFields = new Set(results.flatMap(Object.keys));
  console.log("\nFields found:", [...allFields].filter(f => !["url", "slug"].includes(f)).join(", "));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\nSaved to ${OUTPUT_FILE}`);

  if (skipped.size > 0) {
    console.log(`\n${skipped.size} schools failed — re-run to retry them.`);
  } else {
    console.log("All schools scraped successfully!");
    fs.unlinkSync(CHECKPOINT_FILE);
  }
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
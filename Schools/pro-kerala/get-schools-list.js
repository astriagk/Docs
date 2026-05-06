const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const BASE_URL = "https://www.prokerala.com";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const CHECKPOINT_FILE = "checkpoint.json";
const OUTPUT_FILE = "schools.json";

const CONCURRENCY = 3;
const REQUEST_DELAY_MS = 400;

const http = axios.create({
  headers: {
    "User-Agent": UA,
    Accept: "text/html,application/xhtml+xml",
    "Accept-Language": "en-US,en;q=0.9",
  },
  timeout: 30000,
});

const SCHOOL_LINK_RE = /^\/education\/[a-z0-9-]+-s\d+\.html$/i;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Returns html string, or null on ANY error (including 429) — never throws
async function fetchHtml(url) {
  await sleep(REQUEST_DELAY_MS + Math.random() * 300);
  try {
    const { data } = await http.get(url);
    return data;
  } catch (err) {
    const status = err.response?.status;
    // Log 429s quietly; log everything else
    if (status === 429) {
      process.stdout.write(`\n  ⏭ 429 – skipping: ${url}\n`);
    } else {
      process.stdout.write(`\n  ✗ ${status ?? err.message} – skipping: ${url}\n`);
    }
    return null; // caller checks for null and moves on
  }
}

// ─── Link collection ──────────────────────────────────────────────────────────

async function getSchoolLinks() {
  if (fs.existsSync(CHECKPOINT_FILE)) {
    const cp = JSON.parse(fs.readFileSync(CHECKPOINT_FILE, "utf8"));
    if (cp.links?.length) {
      console.log(`Loaded ${cp.links.length} links from checkpoint`);
      return cp.links;
    }
  }

  const firstUrl = `${BASE_URL}/education/search.php?p=1&mode=school&state=karnataka&page=1`;
  const firstHtml = await fetchHtml(firstUrl);
  if (!firstHtml) throw new Error("Could not fetch first listing page — check your network/IP.");

  const $first = cheerio.load(firstHtml);
  const totalsText = $first("body").text().match(/of\s+(\d+)\s+Total\s+Results/i);
  const total = totalsText ? parseInt(totalsText[1], 10) : null;
  const totalPages = total ? Math.ceil(total / 20) : 1;
  console.log(`Total schools: ${total ?? "unknown"} → ${totalPages} pages`);

  const collected = new Set();
  const collectFrom = ($) =>
    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (href && SCHOOL_LINK_RE.test(href)) collected.add(href);
    });

  collectFrom($first);

  for (let p = 2; p <= totalPages; p++) {
    const url = `${BASE_URL}/education/search.php?p=1&mode=school&state=karnataka&page=${p}`;
    const html = await fetchHtml(url); // null on 429/error → just skip that page
    if (html) {
      collectFrom(cheerio.load(html));
    }
    process.stdout.write(`\r  Listing pages: ${p}/${totalPages} | links: ${collected.size}   `);
  }
  console.log();

  const links = [...collected];
  saveCheckpoint({ links, scraped: {}, skipped: [] });
  return links;
}

// ─── School scraper ───────────────────────────────────────────────────────────

function clean(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function scrapeSchool(link) {
  const html = await fetchHtml(BASE_URL + link);
  if (!html) return null; // 429 or error — skip, move on

  const $ = cheerio.load(html);
  const result = { url: BASE_URL + link, slug: link, name: clean($("h1").first().text()) };

  $("table#institutionDetails tr").each((_, row) => {
    const $row = $(row);
    const label = clean($row.find("th").first().text());
    const valueEl = $row.find("td").first();
    if (!label || !valueEl.length) return;
    const linkHref = valueEl.find("a").attr("href");
    let value = clean(valueEl.text());
    if (label.toLowerCase() === "website" && linkHref) value = linkHref;
    if (label.toLowerCase() === "e-mail" && linkHref)
      value = linkHref.replace(/^mailto:/i, "");
    result[label] = value;
  });

  return result;
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
  const links = await getSchoolLinks();
  console.log(`\nTotal unique school links: ${links.length}`);

  const cp = loadCheckpoint();
  const scraped = cp.scraped ?? {};
  const todo = links.filter((l) => !scraped[l]);
  const total = links.length;

  console.log(`Already scraped: ${Object.keys(scraped).length} | Remaining: ${todo.length}\n`);

  let lastSave = Date.now();

  await runPool(
    todo,
    async (link) => {
      const r = await scrapeSchool(link);
      if (r) scraped[link] = r;
      // null (skipped) links are just not stored — re-run will retry them

      if (Object.keys(scraped).length % 20 === 0 || Date.now() - lastSave > 60_000) {
        saveCheckpoint({ links, scraped });
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

  saveCheckpoint({ links, scraped });

  const results = Object.values(scraped).filter(Boolean);
  console.log(`\n\nScraped: ${results.length} | Skipped/failed: ${total - results.length} | Total: ${total}`);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`Saved to ${OUTPUT_FILE}`);

  if (results.length === total) {
    fs.unlinkSync(CHECKPOINT_FILE);
    console.log("All done!");
  } else {
    console.log(`Re-run to retry the ${total - results.length} skipped schools.`);
  }
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
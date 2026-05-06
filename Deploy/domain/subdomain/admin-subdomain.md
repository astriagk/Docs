# Create Admin Subdomain

## Goal

Create `admin.skolo.astriagk.com` for the admin panel hosted on Vercel.

## Add the Domain in Vercel First

1. Open the Vercel project for the admin panel
2. Go to `Settings -> Domains`
3. Add `admin.skolo.astriagk.com`
4. Confirm the CNAME target shown by Vercel

Vercel commonly uses `cname.vercel-dns.com`.

## Add the DNS Record in GoDaddy

1. Log in to GoDaddy
2. Open `My Products`
3. Select `astriagk.com`
4. Open `DNS` or `Manage DNS`
5. Click `Add New Record`
6. Create this record:

| Field | Value |
| ----- | ----- |
| Type | `CNAME` |
| Name | `admin.skolo` |
| Value | `cname.vercel-dns.com` |
| TTL | `Default` |

7. Click `Save`

## Important Notes

- For a nested subdomain, the `Name` must be `admin.skolo`
- Do not enter the full hostname in the `Name` field
- GoDaddy will create `admin.skolo.astriagk.com`
- Keep all existing MX and mail records for `astriagk.com`

## Verify

1. Return to Vercel
2. Wait for verification to complete
3. Open `https://admin.skolo.astriagk.com`

DNS propagation usually takes 5 to 30 minutes.

## Common Mistakes

- Using `admin` instead of `admin.skolo`
- Using `admin.skolo.astriagk.com` in the `Name` field
- Forgetting to add the domain inside Vercel before testing
- Replacing an existing record instead of adding a new CNAME

## Result

`admin.skolo.astriagk.com` points to the Vercel admin project.

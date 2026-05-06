# Create Landing Subdomain

## Goal

Create `skolo.astriagk.com` for the landing page or main product website.

## Add the Domain in Vercel First

1. Open the Vercel project for the landing site
2. Go to `Settings -> Domains`
3. Add `skolo.astriagk.com`
4. Keep the DNS instructions page open so you can confirm the target value

Vercel commonly uses `cname.vercel-dns.com` for a CNAME target.

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
| Name | `skolo` |
| Value | `cname.vercel-dns.com` |
| TTL | `Default` |

7. Click `Save`

## Important Notes

- In GoDaddy, use only `skolo` in the `Name` field
- Do not enter the full domain name there
- GoDaddy will turn `skolo` into `skolo.astriagk.com`
- Do not remove the existing MX or mail records for `astriagk.com`

## Verify

1. Return to Vercel
2. Wait for the domain check to pass
3. Open `https://skolo.astriagk.com`

DNS changes usually appear in 5 to 30 minutes.

## Common Mistakes

- Writing `skolo.astriagk.com` in the `Name` field instead of `skolo`
- Forgetting to add the custom domain in Vercel
- Accidentally editing email records instead of adding a new CNAME record

## Result

`skolo.astriagk.com` points to the Vercel landing site while `astriagk.com` keeps its existing email setup.

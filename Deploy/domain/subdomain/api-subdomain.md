# Create API Subdomain

## Goal

Create `api.skolo.astriagk.com` for the backend API hosted on Render.

## Add the Domain in Render First

1. Open the Render backend service
2. Go to the custom domain section
3. Add `api.skolo.astriagk.com`
4. Copy the exact Render target for that service

Use the actual Render hostname for your service, such as `<your-service>.onrender.com`.
Do not leave the placeholder value in DNS.

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
| Name | `api.skolo` |
| Value | `<your-service>.onrender.com` |
| TTL | `Default` |

7. Click `Save`

## Important Notes

- For a nested subdomain, the `Name` must be `api.skolo`
- Replace `<your-service>.onrender.com` with the real Render hostname
- Keep all existing MX and mail records for `astriagk.com`
- Verify the custom domain inside Render after DNS starts resolving

## Verify

1. Return to Render
2. Wait for domain verification or SSL provisioning
3. Test the API host, for example `https://api.skolo.astriagk.com`

DNS propagation usually takes 5 to 30 minutes.

## Common Mistakes

- Using `api` instead of `api.skolo`
- Leaving the placeholder `your-backend.onrender.com` in the docs or DNS
- Testing before the DNS record has propagated
- Removing email records while editing DNS

## Result

`api.skolo.astriagk.com` points to the live Render backend service.

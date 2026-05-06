# Parent Domain

## Domain

- Parent domain: `astriagk.com`
- Registrar and current DNS owner: GoDaddy
- Active nameservers:
  - `ns45.domaincontrol.com`
  - `ns46.domaincontrol.com`

## Email

- GoDaddy Email: [https://email.godaddy.com](https://email.godaddy.com)

| Account | Email                |
| ------- | -------------------- |
| Admin   | admin@astriagk.com   |
| Noreply | noreply@astriagk.com |
| Support | skolo@astriagk.com   |

## Important DNS Warning

- Keep the existing MX and mail records for `astriagk.com`
- Do not delete GoDaddy email records while adding website subdomains
- Current MX records point to GoDaddy mail services:
  - `smtp.secureserver.net`
  - `mailstore1.secureserver.net`

## How This Fits the Product

- `astriagk.com` is the root company domain
- Product and app URLs should live under subdomains, not replace the root domain
- Planned product subdomains:
  - `skolo.astriagk.com`
  - `admin.skolo.astriagk.com`
  - `api.skolo.astriagk.com`

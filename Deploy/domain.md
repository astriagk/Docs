# Startup Deployment Guide

**Product:** Skolo  
**Parent Company:** AstriaGK

## 1. Current Recommended Stack

This is the current setup reflected in the domain docs:

| Layer | Service |
| ----- | ------- |
| Parent domain | GoDaddy |
| DNS right now | GoDaddy DNS |
| Frontend and admin | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
| Storage | AWS S3 |
| Mobile apps | Play Store and App Store |

Cloudflare can still be added later if you want CDN or centralized DNS, but it is not the current default path for `astriagk.com`.

## 2. Domain and Subdomain Structure

Use these hostnames:

| Hostname | Purpose |
| -------- | ------- |
| `astriagk.com` | Parent company domain |
| `skolo.astriagk.com` | Landing page or product site |
| `admin.skolo.astriagk.com` | Admin panel |
| `api.skolo.astriagk.com` | Backend API |

Focused docs for these are in `Deploy/domain/`.

## 3. Current DNS Reality

- `astriagk.com` currently resolves through GoDaddy nameservers:
  - `ns45.domaincontrol.com`
  - `ns46.domaincontrol.com`
- GoDaddy email is active for the parent domain
- Do not delete existing MX or mail records while adding website subdomains

## 4. Backend Deployment

Platform: Render

1. Push backend code to GitHub
2. Create a Render web service
3. Add required environment variables
4. Deploy the service
5. Add `api.skolo.astriagk.com` as a custom domain in Render
6. Create a GoDaddy CNAME record with:

| Field | Value |
| ----- | ----- |
| Type | `CNAME` |
| Name | `api.skolo` |
| Value | `<your-service>.onrender.com` |

## 5. Frontend Deployment

Platform: Vercel

For both the landing site and admin panel:

1. Push the frontend code to GitHub
2. Import the project into Vercel
3. Add environment variables
4. Deploy
5. Add the custom domain inside Vercel
6. Create the matching GoDaddy CNAME record

Landing site DNS:

| Field | Value |
| ----- | ----- |
| Type | `CNAME` |
| Name | `skolo` |
| Value | `cname.vercel-dns.com` |

Admin DNS:

| Field | Value |
| ----- | ----- |
| Type | `CNAME` |
| Name | `admin.skolo` |
| Value | `cname.vercel-dns.com` |

## 6. Database and Storage

MongoDB Atlas:

- Create a cluster
- Create a database user
- Add the connection string to the backend environment

AWS S3:

- Create a bucket such as `skolo-uploads`
- Configure permissions and CORS as needed
- Use the bucket from the backend service

## 7. Security Basics

Always configure:

- HTTPS
- JWT authentication
- Environment variables
- CORS
- Rate limiting
- Helmet or equivalent secure headers

## 8. Future Cloudflare Option

If you later move DNS to Cloudflare:

- change the domain nameservers at GoDaddy
- recreate the same DNS records in Cloudflare
- keep email records during the migration

Until that migration happens, manage DNS in GoDaddy.

## 9. Quick Checklist

- [ ] Confirm the app is deployed on Vercel and Render
- [ ] Add custom domains in Vercel and Render first
- [ ] Add the related CNAME records in GoDaddy
- [ ] Keep GoDaddy email records untouched
- [ ] Verify each hostname after DNS propagation

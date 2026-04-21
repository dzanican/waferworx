# WaferWorx Deployment Guide

## Prerequisites

1. **Cloudflare Account** with Workers, D1, and R2 access
2. **Wrangler CLI** installed: `npm install -g wrangler`
3. **Node.js** 18+ installed

## Initial Setup

### 1. Authenticate with Cloudflare

```bash
wrangler login
```

### 2. Create D1 Database

```bash
# Create the database
wrangler d1 create waferworx-db

# Note the database_id from the output and update wrangler.toml
```

### 3. Create R2 Bucket

```bash
wrangler r2 bucket create waferworx-files
```

### 4. Create KV Namespace

```bash
wrangler kv:namespace create SESSIONS

# Note the id from the output and update wrangler.toml
```

### 5. Update wrangler.toml

Replace the placeholder IDs with the actual IDs from the commands above:

```toml
[[d1_databases]]
binding = "DB"
database_name = "waferworx-db"
database_id = "YOUR_ACTUAL_DATABASE_ID"

[[kv_namespaces]]
binding = "SESSIONS"
id = "YOUR_ACTUAL_KV_ID"
```

## Database Setup

### Run Migrations

```bash
# Generate migration from Drizzle schema
npm run db:generate

# Apply migrations to D1
wrangler d1 execute waferworx-db --file=./drizzle/0000_initial.sql
```

### Seed Demo Data

```bash
wrangler d1 execute waferworx-db --file=./drizzle/seed.sql
```

## Deployment

### Preview Deployment

```bash
npm run build
wrangler pages deploy .open-next --project-name=waferworx-preview
```

### Production Deployment

```bash
npm run build
wrangler pages deploy .open-next --project-name=waferworx
```

## Environment Variables

Set these in the Cloudflare dashboard or via wrangler:

```bash
# Set production JWT secret
wrangler secret put JWT_SECRET
```

**Required Variables:**
- `JWT_SECRET` - Secret key for JWT token signing (change from demo value!)

## Demo Accounts

After seeding, these accounts are available:

| Role | Username | Password |
|------|----------|----------|
| Management | Management | Password |
| Technician | FSE | Password |
| Customer | Customer | Password |

## Monitoring

- **Workers Analytics**: Cloudflare Dashboard > Workers > waferworx > Analytics
- **D1 Metrics**: Cloudflare Dashboard > D1 > waferworx-db
- **R2 Usage**: Cloudflare Dashboard > R2 > waferworx-files

## Troubleshooting

### Build Errors

```bash
# Clear build cache
rm -rf .next .open-next node_modules/.cache
npm run build
```

### Database Connection Issues

```bash
# Test D1 connection
wrangler d1 execute waferworx-db --command="SELECT 1"
```

### View Logs

```bash
wrangler tail
```

## Custom Domain

1. Go to Cloudflare Dashboard > Pages > waferworx
2. Click "Custom domains"
3. Add your domain
4. Update DNS records as instructed

## Rollback

```bash
# List deployments
wrangler pages deployment list --project-name=waferworx

# Rollback to specific deployment
wrangler pages deployment rollback --project-name=waferworx --deployment-id=<ID>
```

# Plumbot SaaS

Multi-tenant Telegram bot platform for plumbers to generate quotes, invoices, and manage bookings.

## Overview

**Domain:** plumbot.run (or plumbot.app)
**Repository:** https://github.com/EmergentInventions/plumbot
**Branch:** feature/saas-platform

## Three-Tier Pricing

| Tier | Price | Features | Status |
|------|-------|----------|--------|
| **Plumbum** | £39/mo | PDF Estimates, Invoices (bank transfer), Bookings (.ics files), Basic dashboard | **Building Now** |
| **Gold** | £109/mo | + Payment links (Stripe/PayPal/etc - their accounts) | Listed, build on demand |
| **Platinum** | £599/mo | + Xero sync, Google Calendar 2-way sync, deep integrations | Listed, build on demand |

## Architecture

### Tech Stack
- **Frontend:** Next.js 14 (App Router), Tailwind CSS, shadcn/ui
- **Backend:** Express.js API
- **Database:** PostgreSQL (AWS RDS)
- **Bot:** Grammy (Telegram Bot API)
- **PDF:** PDFKit
- **Calendar:** .ics file generation
- **Hosting:** AWS EC2 + Docker Compose
- **Domain:** Cloudflare DNS → Vercel (frontend) + EC2 (API)

### Infrastructure
```
Cloudflare DNS
├── plumbot.run → Vercel (Next.js)
└── api.plumbot.run → AWS EC2 (Express API + bots)

AWS EC2 (Docker Compose)
├── Container: API + Multi-tenant Bot Service
├── RDS PostgreSQL
└── EBS Volume (PDF storage)
```

## Project Structure

```
saas/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Express backend
├── packages/
│   ├── database/         # Prisma schema + client
│   └── shared/           # Shared types/utilities
├── docker-compose.yml
└── package.json
```

## Development

### Prerequisites
- Node.js 20+
- pnpm 8+
- PostgreSQL 15+

### Setup

```bash
# Install dependencies
pnpm install

# Set up database
pnpm db:generate
pnpm db:migrate

# Start development
pnpm dev
```

### Environment Variables

Create `.env` files in:
- `apps/web/.env.local`
- `apps/api/.env`

See individual app READMEs for required variables.

## 4-Week Build Plan

See PROJECT_PLAN.md for detailed week-by-week breakdown.

## License

MIT

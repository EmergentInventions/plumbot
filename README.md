# Plumbot

Multi-tenant SaaS platform for plumbers - quotes, invoices, and bookings via Telegram.

## Repository Structure

```
plumbot/
├── openclaw/          # OpenClawd framework (forked from https://github.com/openclaw/openclaw)
│   ├── src/
│   ├── skills/
│   └── ...
├── saas/              # Plumbot SaaS application
│   ├── apps/web/      # Next.js frontend
│   ├── apps/api/      # Express backend
│   └── packages/      # Shared packages
└── prototype/         # Original EC2 prototype (private - not tracked in git)
```

## Quick Start

### SaaS Development
```bash
cd saas
pnpm install
pnpm dev
```

### OpenClawd (if needed)
```bash
cd openclaw
pnpm install
pnpm dev
```

## Documentation

- [SaaS README](./saas/README.md)

## Security Notice

The `prototype/` directory contains sensitive data from the original EC2 instance 
and is not tracked in git. See .gitignore for details.

## Branches

- `main` - Production-ready code
- `feature/saas-platform` - SaaS development
- `restructure/organize-folders` - Repository reorganization

## License

See LICENSE file in openclaw/ directory for OpenClawd licensing.

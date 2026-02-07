#!/bin/bash
set -e  # Exit on error

echo "🚀 Plumbot Repository Reorganization Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}Current branch: $CURRENT_BRANCH${NC}"

# Step 1: Backup current work
echo ""
echo "Step 1: Creating backups..."
echo "-----------------------------"
mkdir -p /tmp/plumbot-reorg-backup
if [ -d "saas" ]; then
    cp -r saas /tmp/plumbot-reorg-backup/
    echo "✅ Backed up saas/"
fi
if [ -d "plumbot-ec2-20260206" ]; then
    cp -r plumbot-ec2-20260206 /tmp/plumbot-reorg-backup/
    echo "✅ Backed up plumbot-ec2-20260206/"
fi
echo -e "${GREEN}Backups created in /tmp/plumbot-reorg-backup/${NC}"

# Step 2: Create new branch for reorganization
echo ""
echo "Step 2: Creating reorganization branch..."
echo "-----------------------------------------"
git checkout -b restructure/organize-folders 2>/dev/null || git checkout restructure/organize-folders
echo -e "${GREEN}On branch: restructure/organize-folders${NC}"

# Step 3: Preserve SaaS and Prototype temporarily
echo ""
echo "Step 3: Preserving your work..."
echo "-------------------------------"
mkdir -p /tmp/plumbot-preserve
[ -d "saas" ] && mv saas /tmp/plumbot-preserve/
[ -d "plumbot-ec2-20260206" ] && mv plumbot-ec2-20260206 /tmp/plumbot-preserve/
echo "✅ SaaS and prototype moved to temporary location"

# Step 4: Create new directory structure
echo ""
echo "Step 4: Creating new structure..."
echo "---------------------------------"
mkdir -p openclaw
mkdir -p prototype
echo "✅ Created openclaw/ and prototype/ directories"

# Step 5: Move OpenClawd files into subdirectory
echo ""
echo "Step 5: Moving OpenClawd files..."
echo "---------------------------------"

# List of OpenClawd directories to move
OPENCLAW_DIRS=(
    "src"
    "apps"
    "skills"
    "extensions"
    "ui"
    "docs"
    "scripts"
    "test"
    "patches"
    "assets"
    "bin"
    "vendor"
    "config"
    "public"
)

# Move each directory if it exists
for dir in "${OPENCLAW_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        mv "$dir" openclaw/
        echo "  ✅ Moved $dir/ → openclaw/$dir/"
    fi
done

# Move root OpenClawd files
OPENCLAW_FILES=(
    "package.json"
    "pnpm-lock.yaml"
    "pnpm-workspace.yaml"
    "tsconfig.json"
    "turbo.json"
    ".eslintrc*"
    ".prettierrc*"
    ".oxlintrc*"
    ".oxfmtrc*"
    ".swif*"
    "appcast.xml"
    "CHANGELOG.md"
    "LICENSE"
    "README.md"
    "README-header.png"
    ".npmrc"
    ".nvmrc"
    "vitest.config.*"
    "Dockerfile*"
    "docker-compose*"
    ".dockerignore"
    ".env*"
    "Makefile"
)

for file in "${OPENCLAW_FILES[@]}"; do
    # Use find to handle wildcards
    find . -maxdepth 1 -name "$file" -type f -exec mv {} openclaw/ \; 2>/dev/null || true
done

echo -e "${GREEN}OpenClawd files reorganized${NC}"

# Step 6: Restore your work
echo ""
echo "Step 6: Restoring your work..."
echo "------------------------------"
[ -d "/tmp/plumbot-preserve/saas" ] && mv /tmp/plumbot-preserve/saas ./
[ -d "/tmp/plumbot-preserve/plumbot-ec2-20260206" ] && mv /tmp/plumbot-preserve/plumbot-ec2-20260206 ./prototype/
echo "✅ Restored saas/ and prototype/"

# Step 7: Update .gitignore
echo ""
echo "Step 7: Updating .gitignore..."
echo "------------------------------"
cat >> .gitignore << 'EOF'

# Plumbot specific - do not track
prototype/
openclaw/data/
openclaw/*.env
openclaw/.env.*
*.sqlite
*.db
google-credentials.json
data/quotes/
data/*.json

# Sensitive
*.pem
*.key
secrets/
EOF
echo "✅ Updated .gitignore"

# Step 8: Create new README
echo ""
echo "Step 8: Creating new README..."
echo "------------------------------"
cat > README.md << 'EOF'
# Plumbot

Multi-tenant SaaS platform for plumbers - quotes, invoices, and bookings via Telegram.

## Repository Structure

```
plumbot/
├── openclaw/          # OpenClawd framework (forked)
│   ├── src/
│   ├── skills/
│   └── ...
├── saas/              # Plumbot SaaS application
│   ├── apps/web/      # Next.js frontend
│   ├── apps/api/      # Express backend
│   └── packages/      # Shared packages
└── prototype/         # Original EC2 prototype (private)
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
- [Project Plan](./saas/PROJECT_PLAN.md) (if exists)

## Security Notice

The `prototype/` directory contains sensitive data from the original EC2 instance 
and is not tracked in git. See .gitignore for details.
EOF
echo "✅ Created new README.md"

# Step 9: Verify structure
echo ""
echo "Step 9: Verifying structure..."
echo "------------------------------"
echo "Directories:"
ls -la | grep "^d"
echo ""
echo "Key files:"
ls -la | grep -E "^-" | head -10

# Step 10: Commit changes
echo ""
echo "Step 10: Committing changes..."
echo "------------------------------"
git add .
git status
echo ""
echo -e "${YELLOW}Review the changes above. If they look correct, run:${NC}"
echo "  git commit -m \"restructure: separate OpenClawd, SaaS, and prototype\""
echo ""

echo -e "${GREEN}✅ Reorganization complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the changes with: git status"
echo "2. Commit with: git commit -m \"restructure: separate OpenClawd, SaaS, and prototype\""
echo "3. Push with: git push origin restructure/organize-folders"
echo "4. Create PR to merge into main"
echo ""
echo "After that, to sync with upstream OpenClawd:"
echo "  cd openclaw/"
echo "  git remote add upstream https://github.com/openclaw/openclaw"
echo "  git fetch upstream"
echo "  git merge upstream/main"

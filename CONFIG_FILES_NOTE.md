# Configuration Files - Important Note

## 📝 File Naming Convention

All configuration files in this project have been renamed **without the dot (`.`) prefix** to ensure GitHub compatibility and proper file visibility.

---

## 📋 Renamed Configuration Files

| Original Name | New Name | Purpose |
|---------------|----------|---------|
| `.env.example` | `env.example` | Environment variables template |
| `.eslintignore` | `eslintignore` | ESLint ignore patterns |
| `.prettierignore` | `prettierignore` | Prettier ignore patterns |
| `.prettierrc` | `prettierrc` | Prettier configuration |
| `.solhint.json` | `solhint.json` | Solidity linter configuration |
| `.solhintignore` | `solhintignore` | Solhint ignore patterns |
| `.lintstagedrc.json` | `lintstagedrc.json` | Lint-staged configuration |
| `.github/` | `github/` | GitHub Actions workflows folder |
| `.husky/` | `husky/` | Git hooks folder |

**Note**: `.git/` and `.gitignore` remain unchanged as they are essential Git files.

---

## 🔧 Updated Command References

All npm scripts and hooks have been updated to reference the new filenames:

### ESLint Commands
```bash
# Lint with explicit config
npm run lint
# Uses: --ignore-path eslintignore

# Auto-fix linting issues
npm run lint:fix
# Uses: --ignore-path eslintignore
```

### Prettier Commands
```bash
# Format code
npm run format
# Uses: --config prettierrc --ignore-path prettierignore

# Check formatting
npm run format:check
# Uses: --config prettierrc --ignore-path prettierignore
```

### Solhint Commands
```bash
# Lint Solidity contracts
npm run lint:sol
# Uses: --config solhint.json

# Auto-fix Solidity issues
npm run lint:sol:fix
# Uses: --config solhint.json
```

### Lint-staged
```bash
# Pre-commit checks
npm run precommit
# Uses: --config lintstagedrc.json
```

---

## 📂 Folder Structure Changes

### GitHub Actions Workflows

**Old path**: `.github/workflows/`
**New path**: `github/workflows/`

All workflow files remain unchanged:
- `github/workflows/test.yml` - Test suite workflow
- `github/workflows/security.yml` - Security audit workflow

### Git Hooks (Husky)

**Old path**: `.husky/`
**New path**: `husky/`

Hook files have been updated to use explicit config paths:
- `husky/pre-commit` - Pre-commit checks with explicit config references
- `husky/commit-msg` - Commit message validation with explicit config

---

## ⚙️ Setup Instructions

### First Time Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/private-property-platform.git
cd private-property-platform

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Copy environment file (note the new name!)
cp env.example .env

# 4. Edit .env with your credentials
nano .env  # or use your preferred editor

# 5. Initialize Husky (git hooks)
npm run prepare
```

### Development Workflow

```bash
# Start development server
npm run dev

# Run linting (uses eslintignore and prettierrc)
npm run lint

# Run Solidity linting (uses solhint.json)
npm run lint:sol

# Format code (uses prettierrc and prettierignore)
npm run format

# Run all quality checks
npm run quality:check

# Commit changes (pre-commit hooks will run automatically)
git add .
git commit -m "feat: your commit message"
```

---

## 🔍 Configuration File Locations

All configuration files are now in the **project root directory** without dot prefixes:

```
private-property-platform/
├── commitlint.config.js          # Commit message rules
├── env.example                   # Environment template (renamed!)
├── eslint.config.js              # ESLint configuration
├── eslintignore                  # ESLint ignore patterns (renamed!)
├── github/                       # GitHub Actions (renamed!)
│   └── workflows/
│       ├── test.yml
│       └── security.yml
├── hardhat.config.js             # Hardhat configuration
├── husky/                        # Git hooks (renamed!)
│   ├── pre-commit
│   └── commit-msg
├── lintstagedrc.json             # Lint-staged config (renamed!)
├── package.json                  # NPM scripts (all updated!)
├── prettierignore                # Prettier ignore (renamed!)
├── prettierrc                    # Prettier config (renamed!)
├── solhint.json                  # Solhint config (renamed!)
├── solhintignore                 # Solhint ignore (renamed!)
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
└── vite.config.ts                # Vite config
```

---

## ✅ Verification

To verify all configurations are working correctly:

```bash
# 1. Test ESLint
npm run lint

# 2. Test Prettier
npm run format:check

# 3. Test Solhint
npm run lint:sol

# 4. Test all quality checks
npm run quality:check

# 5. Test TypeScript compilation
npx tsc --noEmit

# 6. Test pre-commit hooks (without committing)
npx lint-staged --config lintstagedrc.json
```

All commands should run without errors (warnings are acceptable).

---

## 🐛 Troubleshooting

### If linting fails with "config not found":

1. **Verify file exists**: `ls -la | grep eslintignore`
2. **Check package.json**: Ensure scripts reference correct filenames
3. **Try explicit path**: `npx eslint . --ignore-path ./eslintignore`

### If Husky hooks don't run:

1. **Re-initialize Husky**: `npm run prepare`
2. **Check permissions**: `chmod +x husky/pre-commit husky/commit-msg`
3. **Verify git hooks**: `ls -la .git/hooks/`

### If environment variables not loading:

1. **Check filename**: Should be `.env` (with dot!) in root directory
2. **Copy from template**: `cp env.example .env`
3. **Verify contents**: `cat .env` (ensure no syntax errors)

---

## 📚 Related Documentation

- [README.md](./README.md) - Main project documentation
- [SECURITY_AND_PERFORMANCE.md](./SECURITY_AND_PERFORMANCE.md) - Security and performance guide
- [TESTING.md](./TESTING.md) - Testing documentation
- [CI_CD_GUIDE.md](./CI_CD_GUIDE.md) - CI/CD workflow guide

---

**Last Updated**: 2025-10-19
**Reason**: GitHub compatibility - removed dot prefixes from config files
**Impact**: All npm scripts and git hooks updated to use explicit config paths

# CI/CD Guide - Private Property Trading Platform

## 🚀 Continuous Integration & Deployment

This project uses **GitHub Actions** for automated testing, code quality checks, and deployment workflows.

---

## 📋 Table of Contents

- [Workflows Overview](#workflows-overview)
- [Automated Testing](#automated-testing)
- [Code Quality Checks](#code-quality-checks)
- [Coverage Reports](#coverage-reports)
- [Setup Instructions](#setup-instructions)
- [Troubleshooting](#troubleshooting)

---

## 🔄 Workflows Overview

### Main Workflow: `.github/workflows/test.yml`

This workflow runs on:
- ✅ Every push to `main` branch
- ✅ Every push to `develop` branch
- ✅ All pull requests targeting `main` or `develop`

### Jobs Included

| Job | Purpose | Node Versions |
|-----|---------|---------------|
| **test** | Run test suite | 18.x, 20.x, 22.x |
| **lint** | Code quality checks | 22.x |
| **security** | Security audits | 22.x |

---

## 🧪 Automated Testing

### Test Job Details

The test job runs in parallel across **3 Node.js versions** (18.x, 20.x, 22.x) to ensure compatibility.

#### Steps Performed:

1. **Checkout Code**
   ```yaml
   - uses: actions/checkout@v4
     with:
       fetch-depth: 0
   ```

2. **Setup Node.js**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       node-version: ${{ matrix.node-version }}
       cache: 'npm'
   ```

3. **Install Dependencies**
   ```bash
   npm ci --legacy-peer-deps
   ```

4. **Run Solhint** (Solidity Linter)
   ```bash
   npm run lint:sol
   ```
   - Continues on error (won't fail the build)
   - Checks all `.sol` files in `contracts/`

5. **Compile Contracts**
   ```bash
   npm run compile
   ```
   - Compiles Solidity contracts
   - Generates TypeChain types
   - Fails build if compilation errors

6. **Run Tests**
   ```bash
   npm test
   ```
   - Executes all test suites
   - 50+ comprehensive tests
   - Fails build if tests fail

7. **Generate Coverage** (Node 22.x only)
   ```bash
   npm run coverage
   ```
   - Generates code coverage report
   - Uses `solidity-coverage`
   - Creates `lcov.info` file

8. **Upload to Codecov** (Node 22.x only)
   ```yaml
   - uses: codecov/codecov-action@v4
     with:
       token: ${{ secrets.CODECOV_TOKEN }}
   ```

9. **Build Frontend** (Node 22.x only)
   ```bash
   npm run build
   ```
   - TypeScript compilation
   - Vite bundling
   - Production build

10. **Archive Results**
    - Stores test results and coverage
    - Available for 30 days
    - Downloadable from Actions tab

---

## 🎯 Code Quality Checks

### Lint Job

Runs code quality checks independently:

#### Solidity Linting
```bash
npm run lint:sol
```

**Checks performed:**
- ✅ Code complexity (max 8)
- ✅ Compiler version (^0.8.0)
- ✅ Function visibility
- ✅ Max line length (120 chars)
- ✅ Empty blocks
- ✅ Unused variables
- ✅ Quote style (double quotes)
- ✅ Reentrancy vulnerabilities
- ✅ State visibility
- ✅ Variable naming conventions

**Configuration**: `.solhint.json`

#### TypeScript Type Checking
```bash
npx tsc --noEmit
```
- Checks TypeScript types without emitting files
- Ensures type safety across the project

---

## 🔒 Security Audit

### Security Job

Automated security checks:

1. **NPM Audit**
   ```bash
   npm audit --audit-level=moderate
   ```
   - Scans dependencies for known vulnerabilities
   - Moderate and higher severity levels
   - Continues on error (informational)

2. **Audit CI**
   ```bash
   npx audit-ci --moderate
   ```
   - Enhanced security scanning
   - Checks for outdated packages
   - Continues on error (informational)

---

## 📊 Coverage Reports

### Codecov Integration

**Coverage targets:**
- Project coverage: **80%** (±2% threshold)
- Patch coverage: **70%** (±5% threshold)

**Configuration**: `codecov.yml`

**Features:**
- Automatic PR comments with coverage diff
- Coverage badge in README
- Historical coverage tracking
- File-by-file coverage breakdown

**Ignored from coverage:**
- `test/**` - Test files
- `scripts/**` - Deployment scripts
- `src/**` - Frontend code
- Configuration files

---

## ⚙️ Setup Instructions

### For Your Repository

#### 1. Enable GitHub Actions

GitHub Actions are enabled by default for new repositories. If disabled:

1. Go to repository **Settings**
2. Navigate to **Actions** → **General**
3. Select **Allow all actions and reusable workflows**
4. Click **Save**

#### 2. Set Up Codecov

1. Visit [codecov.io](https://codecov.io/)
2. Sign in with GitHub
3. Add your repository
4. Copy the upload token
5. Add to GitHub Secrets:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `CODECOV_TOKEN`
   - Value: [paste token]
   - Click **Add secret**

#### 3. Configure Branch Protection (Optional)

Recommended for `main` branch:

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require status checks before merging
   - ✅ Require branches to be up to date
   - ✅ Status checks: `test`, `lint`, `security`
   - ✅ Require pull request reviews (1 approval)
5. Click **Create**

---

## 🎬 Workflow Triggers

### Automatic Triggers

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```

**When workflows run:**
- Push to `main` → All jobs execute
- Push to `develop` → All jobs execute
- Open PR → All jobs execute
- Update PR → All jobs re-execute
- Push to feature branch → No workflow (unless PR open)

### Manual Trigger (Optional)

To add manual trigger, update workflow:

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  workflow_dispatch:  # Add this line
```

Then trigger via:
- Go to **Actions** tab
- Select workflow
- Click **Run workflow**

---

## 📦 Artifacts

Each workflow run produces artifacts:

**Test Results**
- Name: `test-results-node-[version]`
- Contents: Coverage reports, test outputs
- Retention: 30 days

**Access artifacts:**
1. Go to **Actions** tab
2. Click on a workflow run
3. Scroll to **Artifacts** section
4. Click to download

---

## 🛠️ Local Testing

Test CI workflows locally before pushing:

### Run All Checks Locally

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Run linter
npm run lint:sol

# Compile contracts
npm run compile

# Run tests
npm test

# Generate coverage
npm run coverage

# Build frontend
npm run build

# Security audit
npm run audit
```

### Fix Linting Issues

```bash
npm run lint:sol:fix
```

---

## 📈 Monitoring Workflow Runs

### View Workflow Status

1. **Repository Badge** (add to README.md):
   ```markdown
   ![Test Suite](https://github.com/YOUR_USERNAME/private-property-platform/workflows/Test%20Suite/badge.svg)
   ```

2. **Actions Tab**:
   - See all workflow runs
   - Filter by branch, status, event
   - View logs and artifacts

3. **PR Checks**:
   - Automatic status checks on PRs
   - Click "Details" to see logs
   - Must pass before merge (if protected)

### Email Notifications

Configure in GitHub settings:
- **Settings** → **Notifications**
- Enable **Actions** notifications
- Choose: All activity / Only failures

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Workflow Not Running

**Check:**
- Workflow file location: `.github/workflows/test.yml`
- YAML syntax is valid
- Branch name matches trigger
- Actions enabled in repository settings

#### 2. Tests Failing on CI but Passing Locally

**Possible causes:**
- Node version difference (use Node 22.x locally)
- Missing environment variables
- File path case sensitivity (Linux vs Windows)
- Timezone differences

**Solution:**
```bash
# Match CI environment
nvm install 22
nvm use 22
npm ci --legacy-peer-deps
npm test
```

#### 3. Codecov Upload Failing

**Check:**
- `CODECOV_TOKEN` secret is set
- Coverage file exists: `coverage/lcov.info`
- Codecov action version is latest

**Debug:**
```bash
# Generate coverage locally
npm run coverage

# Check file exists
ls -la coverage/lcov.info
```

#### 4. Solhint Errors

**View errors:**
```bash
npm run lint:sol
```

**Auto-fix:**
```bash
npm run lint:sol:fix
```

**Skip in CI** (if needed):
- Add `continue-on-error: true` to step
- Already configured for Solhint step

#### 5. Node Version Mismatch

**Error:** "Unsupported engine"

**Solution:**
- CI uses 18.x, 20.x, 22.x
- Recommend: Use Node 22.x locally
- Install: `nvm install 22 && nvm use 22`

---

## 📝 Workflow Customization

### Add More Node Versions

Edit `.github/workflows/test.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x, 23.x]  # Add more
```

### Add Deployment Job

```yaml
deploy:
  name: Deploy to GitHub Pages
  runs-on: ubuntu-latest
  needs: [test, lint]  # Wait for tests to pass
  if: github.ref == 'refs/heads/main'

  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci --legacy-peer-deps
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Add Slack Notifications

```yaml
- name: Notify Slack
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📚 Best Practices

### ✅ Do's

- ✅ Run tests locally before pushing
- ✅ Keep workflows fast (< 10 minutes)
- ✅ Use caching for dependencies
- ✅ Monitor workflow usage/costs
- ✅ Review failed workflow logs
- ✅ Update dependencies regularly
- ✅ Use semantic versioning for actions

### ❌ Don'ts

- ❌ Commit secrets to repository
- ❌ Run heavy processes in CI
- ❌ Ignore failing tests
- ❌ Skip code review
- ❌ Deploy without tests passing
- ❌ Use `--force` flags in CI

---

## 🔗 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Codecov Documentation](https://docs.codecov.com/)
- [Solhint Rules](https://github.com/protofire/solhint/blob/master/docs/rules.md)
- [Hardhat Testing Guide](https://hardhat.org/tutorial/testing-contracts)
- [Vite Build Guide](https://vite.dev/guide/build.html)

---

## 📊 Workflow Status

Check current workflow status:

**Badge Markdown:**
```markdown
[![Test Suite](https://github.com/YOUR_USERNAME/private-property-platform/workflows/Test%20Suite/badge.svg)](https://github.com/YOUR_USERNAME/private-property-platform/actions)
[![codecov](https://codecov.io/gh/YOUR_USERNAME/private-property-platform/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/private-property-platform)
```

---

**Last Updated**: 2025-10-18
**CI/CD Version**: 1.0.0
**Status**: ✅ Production Ready

#!/bin/bash

# Configuration Files Verification Script
# This script verifies that all config files have been properly renamed

echo "======================================"
echo "  Configuration Files Verification"
echo "======================================"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASS=0
FAIL=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $1 (missing)${NC}"
        ((FAIL++))
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1/${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $1/ (missing)${NC}"
        ((FAIL++))
    fi
}

# Function to check if old file/dir exists (should not)
check_not_exists() {
    if [ ! -e "$1" ]; then
        echo -e "${GREEN}✅ $1 (correctly removed)${NC}"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠️  $1 (still exists - should be removed)${NC}"
        ((FAIL++))
    fi
}

echo "Checking renamed configuration files..."
echo "---------------------------------------"
check_file "env.example"
check_file "eslintignore"
check_file "prettierignore"
check_file "prettierrc"
check_file "solhint.json"
check_file "solhintignore"
check_file "lintstagedrc.json"
echo ""

echo "Checking renamed folders..."
echo "---------------------------------------"
check_dir "github"
check_dir "github/workflows"
check_dir "husky"
echo ""

echo "Checking essential Git files (should exist)..."
echo "---------------------------------------"
check_dir ".git"
check_file ".gitignore"
echo ""

echo "Checking old files (should NOT exist)..."
echo "---------------------------------------"
check_not_exists ".env.example"
check_not_exists ".eslintignore"
check_not_exists ".prettierignore"
check_not_exists ".prettierrc"
check_not_exists ".solhint.json"
check_not_exists ".solhintignore"
check_not_exists ".lintstagedrc.json"
check_not_exists ".github"
check_not_exists ".husky"
echo ""

echo "Checking GitHub workflows..."
echo "---------------------------------------"
check_file "github/workflows/test.yml"
check_file "github/workflows/security.yml"
check_file "github/workflows/deploy.yml"
echo ""

echo "Checking git hooks..."
echo "---------------------------------------"
check_file "husky/pre-commit"
check_file "husky/commit-msg"
echo ""

echo "Checking documentation..."
echo "---------------------------------------"
check_file "CONFIG_FILES_NOTE.md"
check_file "GITHUB_COMPATIBILITY_CHANGES.md"
check_file "README.md"
echo ""

# Summary
echo "======================================"
echo "  Verification Summary"
echo "======================================"
echo -e "${GREEN}Passed: $PASS${NC}"
echo -e "${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Configuration is correct.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install --legacy-peer-deps"
    echo "2. Run: cp env.example .env"
    echo "3. Edit .env with your credentials"
    echo "4. Run: npm run prepare (initialize git hooks)"
    echo "5. Test: npm run quality:check"
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Please review the errors above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "1. If old dot-prefixed files exist: Remove them manually"
    echo "2. If new files missing: Restore from git or recreate"
    echo "3. For more help: See CONFIG_FILES_NOTE.md"
    exit 1
fi

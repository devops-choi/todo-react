@echo off
REM Windows batch script for setting up Git hooks

echo 🔧 Setting up Git hooks for Windows...

REM Check if we're in a git repository
if not exist ".git" (
    echo ❌ Error: Not in a Git repository
    echo Please run this script from the root of your Git repository
    pause
    exit /b 1
)

REM Create hooks directory if it doesn't exist
if not exist ".git\hooks" mkdir ".git\hooks"

REM Copy pre-commit hook
if exist ".githooks\pre-commit" (
    copy ".githooks\pre-commit" ".git\hooks\pre-commit" >nul
    echo ✅ Pre-commit hook installed
) else (
    echo ❌ Warning: .githooks\pre-commit not found
)

REM Make sure npm scripts are available
echo 📦 Checking npm scripts...
npm run lint --silent >nul 2>&1
if errorlevel 1 (
    echo ❌ Warning: lint script not available in package.json
) else (
    echo ✅ Lint script available
)

npm run format:check --silent >nul 2>&1
if errorlevel 1 (
    echo ❌ Warning: format:check script not available in package.json
) else (
    echo ✅ Format check script available
)

npm run ci:test --silent >nul 2>&1
if errorlevel 1 (
    echo ❌ Warning: ci:test script not available in package.json
) else (
    echo ✅ Test script available
)

echo.
echo 🎉 Git hooks setup completed!
echo.
echo 📋 What happens now:
echo   - Before each commit, code will be automatically checked
echo   - ESLint will check for code issues
echo   - Prettier will check code formatting
echo   - Tests will run to ensure nothing is broken
echo.
echo 💡 Pro tips:
echo   - Run 'npm run lint:fix' to auto-fix linting issues
echo   - Run 'npm run format' to auto-format your code
echo   - Run 'npm run ci:build' to run full CI pipeline locally
echo.
pause

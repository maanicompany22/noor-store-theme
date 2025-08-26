@echo off
echo ========================================
echo    Noor Store Theme - Component Fix
echo ========================================
echo.

echo [1/4] Installing dependencies...
call pnpm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed successfully
echo.

echo [2/4] Building theme for production...
call pnpm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build theme
    pause
    exit /b 1
)
echo ✅ Theme built successfully
echo.

echo [3/4] Previewing theme...
echo Starting theme preview...
echo Please check the preview in your browser
echo.
echo [4/4] Next steps:
echo 1. Test all components in the preview
echo 2. Check browser console for 422 errors
echo 3. If no errors, publish the theme:
echo    pnpm run publish
echo.
echo Press any key to continue...
pause >nul

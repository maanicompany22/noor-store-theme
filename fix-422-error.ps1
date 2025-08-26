# Noor Store Theme - Fix 422 Error
# PowerShell Script for Windows

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    Noor Store Theme - Fix 422 Error" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if pnpm is installed
try {
    $pnpmVersion = pnpm --version
    Write-Host "✅ pnpm version: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm is not installed. Please install it first." -ForegroundColor Red
    Write-Host "Run: npm install -g pnpm" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Step 1: Install dependencies
Write-Host "[1/6] Installing dependencies..." -ForegroundColor Yellow
try {
    pnpm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
    } else {
        throw "pnpm install failed"
    }
} catch {
    Write-Host "❌ Failed to install dependencies: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Step 2: Validate component configuration
Write-Host "[2/6] Validating component configuration..." -ForegroundColor Yellow
try {
    # Check if twilight.json exists and is valid JSON
    if (Test-Path "twilight.json") {
        $twilight = Get-Content "twilight.json" -Raw | ConvertFrom-Json
        Write-Host "✅ twilight.json is valid JSON" -ForegroundColor Green
        
        # Check component versions
        $components = $twilight.components
        if ($components) {
            Write-Host "✅ Found $($components.Count) components" -ForegroundColor Green
            foreach ($comp in $components) {
                if ($comp.version_id -and $comp.component_hash) {
                    Write-Host "   ✅ $($comp.key): $($comp.version_id) | Hash: $($comp.component_hash)" -ForegroundColor Green
                } else {
                    Write-Host "   ⚠️  $($comp.key): Missing version_id or component_hash" -ForegroundColor Yellow
                }
            }
        }
    } else {
        throw "twilight.json not found"
    }
} catch {
    Write-Host "❌ Component validation failed: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Step 3: Check component files
Write-Host "[3/6] Checking component files..." -ForegroundColor Yellow
try {
    $componentFiles = @(
        "src/views/components/home/hero-banner.twig",
        "src/views/components/home/categories-showcase.twig",
        "src/views/components/home/social-proof.twig",
        "src/views/components/home/newsletter-signup.twig"
    )
    
    foreach ($file in $componentFiles) {
        if (Test-Path $file) {
            Write-Host "   ✅ $file exists" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $file missing" -ForegroundColor Red
        }
    }
} catch {
    Write-Host "❌ Component file check failed: $_" -ForegroundColor Red
}

Write-Host ""

# Step 4: Build theme
Write-Host "[4/6] Building theme for production..." -ForegroundColor Yellow
try {
    pnpm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Theme built successfully" -ForegroundColor Green
    } else {
        throw "Build failed"
    }
} catch {
    Write-Host "❌ Failed to build theme: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Step 5: Start preview
Write-Host "[5/6] Starting theme preview..." -ForegroundColor Yellow
Write-Host "Starting theme preview in background..." -ForegroundColor Cyan
Write-Host "Please check the preview in your browser" -ForegroundColor Cyan

# Start preview in background
Start-Job -ScriptBlock { pnpm run preview } | Out-Null

Write-Host "✅ Theme preview started" -ForegroundColor Green
Write-Host ""

# Step 6: Instructions
Write-Host "[6/6] Next steps:" -ForegroundColor Yellow
Write-Host "1. Test all components in the preview" -ForegroundColor White
Write-Host "2. Check browser console for 422 errors" -ForegroundColor White
Write-Host "3. Verify components load correctly" -ForegroundColor White
Write-Host "4. If no errors, publish the theme:" -ForegroundColor White
Write-Host "   pnpm run publish" -ForegroundColor Cyan
Write-Host ""

# Additional troubleshooting steps
Write-Host "🔧 If 422 errors persist:" -ForegroundColor Yellow
Write-Host "1. Clear Salla platform cache" -ForegroundColor White
Write-Host "2. Check component registration in Salla admin" -ForegroundColor White
Write-Host "3. Verify component paths match file structure" -ForegroundColor White
Write-Host "4. Contact Salla support if needed" -ForegroundColor White
Write-Host ""

Write-Host "📁 Files modified:" -ForegroundColor Yellow
Write-Host "- twilight.json: Added version tracking and component hashes" -ForegroundColor White
Write-Host "- salla-components.json: Salla-specific component registry" -ForegroundColor White
Write-Host "- component-registry.json: Component registry created" -ForegroundColor White
Write-Host "- social-proof.twig: Added error handling" -ForegroundColor White
Write-Host ""

Write-Host "🔍 Debugging 422 Error:" -ForegroundColor Yellow
Write-Host "The 422 error occurs when version_id is empty in API calls." -ForegroundColor White
Write-Host "We've added:" -ForegroundColor White
Write-Host "- component_hash for unique identification" -ForegroundColor White
Write-Host "- component_version for version tracking" -ForegroundColor White
Write-Host "- theme_id for theme identification" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to continue..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

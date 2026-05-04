# Setup database for DEVDLE
$postgresUser = "postgres"
$postgresPassword = "haslo1234"
$dbName = "languages"
$dbHost = "localhost"

Write-Host "Setting up PostgreSQL database..." -ForegroundColor Green

# Create database if it doesn't exist
$env:PGPASSWORD = $postgresPassword
Write-Host "Creating database '$dbName'..." -ForegroundColor Yellow

# Use psql from PostgreSQL installation
$postgresPath = "C:\Program Files\PostgreSQL\16\bin\psql.exe"

if (-not (Test-Path $postgresPath)) {
    # Try other common PostgreSQL versions
    $postgresPath = (Get-ChildItem "C:\Program Files\PostgreSQL\*/bin/psql.exe" -ErrorAction SilentlyContinue | Select-Object -First 1).FullName
}

if (-not $postgresPath) {
    Write-Host "PostgreSQL psql not found. Please ensure PostgreSQL is installed and in PATH." -ForegroundColor Red
    Write-Host "Tried to find at: C:\Program Files\PostgreSQL\16\bin\psql.exe" -ForegroundColor Red
    exit 1
}

Write-Host "Using psql at: $postgresPath" -ForegroundColor Yellow

# Create database
& $postgresPath -h $dbHost -U $postgresUser -tc "CREATE DATABASE $dbName;" 2>&1 | Where-Object { $_ -notmatch "already exists" }

Write-Host "Database creation attempted (ignoring 'already exists' errors)." -ForegroundColor Yellow

# Run init.sql
Write-Host "Running schema initialization..." -ForegroundColor Yellow
& $postgresPath -h $dbHost -U $postgresUser -d $dbName -f "infra/init.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Schema initialized successfully!" -ForegroundColor Green
} else {
    Write-Host "Error initializing schema (might already exist, continuing...)..." -ForegroundColor Yellow
}

# Run seed.sql
Write-Host "Running data seeding..." -ForegroundColor Yellow
& $postgresPath -h $dbHost -U $postgresUser -d $dbName -f "infra/seed.sql"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database seeded successfully!" -ForegroundColor Green
} else {
    Write-Host "Error seeding database (data might already exist)..." -ForegroundColor Yellow
}

Write-Host "`nDatabase setup complete!" -ForegroundColor Green

# Run DEVDLE Backend
Write-Host "Starting DEVDLE Backend..." -ForegroundColor Green

$env:DB_HOST = "localhost"
$env:DB_USER = "postgres"
$env:DB_PASSWORD = "haslo1234"
$env:DB_NAME = "languages"
$env:DB_PORT = "5432"
$env:PORT = "8080"
$env:FRONTEND_URL = "http://localhost:3000"

Write-Host "Environment variables set:" -ForegroundColor Yellow
Write-Host "  DB_HOST: $env:DB_HOST"
Write-Host "  DB_USER: $env:DB_USER"
Write-Host "  DB_NAME: $env:DB_NAME"
Write-Host "  PORT: $env:PORT"
Write-Host "  FRONTEND_URL: $env:FRONTEND_URL"
Write-Host ""

Set-Location -Path ".\backend"
Write-Host "Running: go run main.go" -ForegroundColor Cyan
Write-Host ""

go run main.go

# PowerShell script to build and start the banking application

# Navigate to the project root directory
Set-Location -Path (Split-Path -Parent $PSScriptRoot)

# Display banner
Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "       Online Banking Application Starter        " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}

# Build and start the containers
Write-Host ""
Write-Host "Building and starting containers..." -ForegroundColor Yellow
Write-Host "This may take a few minutes for the first run." -ForegroundColor Yellow
Write-Host ""

try {
    # Navigate to docker directory
    Set-Location -Path "$PSScriptRoot"
    
    # Start the containers
    docker-compose up -d --build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ All containers started successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Application URLs:" -ForegroundColor Cyan
        Write-Host "  Frontend: http://localhost" -ForegroundColor White
        Write-Host "  Backend API: http://localhost:8080/api" -ForegroundColor White
        Write-Host "  API Documentation: http://localhost:8080/swagger-ui/index.html" -ForegroundColor White
        Write-Host ""
        Write-Host "Database Connection:" -ForegroundColor Cyan
        Write-Host "  Host: localhost" -ForegroundColor White
        Write-Host "  Port: 3306" -ForegroundColor White
        Write-Host "  Database: banking" -ForegroundColor White
        Write-Host "  Username: bankinguser" -ForegroundColor White
        Write-Host "  Password: bankingpassword" -ForegroundColor White
        Write-Host ""
        Write-Host "To stop the application, run: .\docker\stop.ps1" -ForegroundColor Yellow
    } else {
        Write-Host "✗ Failed to start containers. Check the error messages above." -ForegroundColor Red
    }
} catch {
    Write-Host "✗ An error occurred: $_" -ForegroundColor Red
} finally {
    # Return to original directory
    Set-Location -Path (Split-Path -Parent $PSScriptRoot)
}
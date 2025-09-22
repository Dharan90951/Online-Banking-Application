# PowerShell script to stop the banking application

# Navigate to the docker directory
Set-Location -Path $PSScriptRoot

# Display banner
Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "      Online Banking Application Shutdown        " -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Stop the containers
Write-Host "Stopping containers..." -ForegroundColor Yellow

try {
    docker-compose down
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✓ All containers stopped successfully!" -ForegroundColor Green
        
        # Ask if user wants to remove volumes
        $removeVolumes = Read-Host "Do you want to remove all data volumes? This will delete all database data. (y/N)"
        
        if ($removeVolumes -eq "y" -or $removeVolumes -eq "Y") {
            docker-compose down -v
            Write-Host "✓ All volumes removed successfully!" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "To start the application again, run: .\docker\start.ps1" -ForegroundColor Yellow
    } else {
        Write-Host "✗ Failed to stop containers. Check the error messages above." -ForegroundColor Red
    }
} catch {
    Write-Host "✗ An error occurred: $_" -ForegroundColor Red
}
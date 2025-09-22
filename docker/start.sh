#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")/.." || exit

# Display banner
echo ""
echo "===================================================" 
echo "       Online Banking Application Starter        " 
echo "===================================================" 
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "✗ Docker is not running. Please start Docker and try again."
    exit 1
else
    echo "✓ Docker is running"
fi

# Build and start the containers
echo ""
echo "Building and starting containers..."
echo "This may take a few minutes for the first run."
echo ""

# Navigate to docker directory
cd "$(dirname "$0")" || exit

# Start the containers
if docker-compose up -d --build; then
    echo ""
    echo "✓ All containers started successfully!"
    echo ""
    echo "Application URLs:"
    echo "  Frontend: http://localhost"
    echo "  Backend API: http://localhost:8080/api"
    echo "  API Documentation: http://localhost:8080/swagger-ui/index.html"
    echo ""
    echo "Database Connection:"
    echo "  Host: localhost"
    echo "  Port: 3306"
    echo "  Database: banking"
    echo "  Username: bankinguser"
    echo "  Password: bankingpassword"
    echo ""
    echo "To stop the application, run: ./docker/stop.sh"
    echo ""
 else
    echo "✗ Failed to start containers. Check the error messages above."
    exit 1
fi
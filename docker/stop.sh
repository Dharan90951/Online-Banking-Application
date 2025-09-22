#!/bin/bash

# Navigate to the docker directory
cd "$(dirname "$0")" || exit

# Display banner
echo ""
echo "===================================================" 
echo "      Online Banking Application Shutdown        " 
echo "===================================================" 
echo ""

# Stop the containers
echo "Stopping containers..."

if docker-compose down; then
    echo ""
    echo "✓ All containers stopped successfully!"
    
    # Ask if user wants to remove volumes
    read -p "Do you want to remove all data volumes? This will delete all database data. (y/N): " REMOVE_VOLUMES
    
    if [[ "$REMOVE_VOLUMES" =~ ^[Yy]$ ]]; then
        docker-compose down -v
        echo "✓ All volumes removed successfully!"
    fi
    
    echo ""
    echo "To start the application again, run: ./docker/start.sh"
    echo ""
else
    echo "✗ Failed to stop containers. Check the error messages above."
    exit 1
fi
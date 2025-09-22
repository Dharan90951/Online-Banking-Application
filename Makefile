# Makefile for Online Banking Application

.PHONY: help build up down clean logs ps

help: ## Show this help
	@echo "\nUsage: make [target]\n"
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build all containers
	cd docker && docker-compose build

up: ## Start all containers
	cd docker && docker-compose up -d

down: ## Stop all containers
	cd docker && docker-compose down

clean: ## Stop all containers and remove volumes
	cd docker && docker-compose down -v

logs: ## Show logs for all containers
	cd docker && docker-compose logs -f

ps: ## Show container status
	cd docker && docker-compose ps

restart: ## Restart all containers
	cd docker && docker-compose restart

backend-logs: ## Show backend logs
	cd docker && docker-compose logs -f backend

frontend-logs: ## Show frontend logs
	cd docker && docker-compose logs -f frontend

database-logs: ## Show database logs
	cd docker && docker-compose logs -f mysql

backend-bash: ## Access backend container shell
	cd docker && docker-compose exec backend /bin/sh

frontend-bash: ## Access frontend container shell
	cd docker && docker-compose exec frontend /bin/sh

database-bash: ## Access database container shell
	cd docker && docker-compose exec mysql bash
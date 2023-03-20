server=node
docker_exec=docker compose exec $(server)
docker_run=docker compose run --name $(server) --rm
port=8080

up: ## Start the project
	cp -n .env.example .env.local
	docker compose up -d
	$(info ************** Serveur VITE démarré sur le port $(port) **************)

stop: ## Stop the project
	docker compose stop

down: ## Stop the project
	docker compose down

logs: ## Show logs
	docker compose logs -f

server=node-client
docker_exec=docker compose exec $(server)
docker_run=docker compose run --name $(server)
port=8080

up: ## Start the project
	$(docker_run) -p $(port):$(port) --rm node yarn dev --host 0.0.0.0

stop: ## Stop the project
	docker compose stop

down: ## Stop the project
	docker compose down

install:
	$(docker_run) --rm node yarn


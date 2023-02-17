server=node-server
docker_exec=docker compose exec $(server)
docker_exec_npx=$(docker_exec) npx
docker_run=docker compose run --name $(server)
port=3000

up: ## Start the project
	$(docker_run) -p $(port):$(port) --rm yarn start:dev

stop: ## Stop the project
	docker compose stop

install:
	$(docker_run) --rm node yarn

entity:
	$(docker_exec_npx) nest generate module $(name)
	$(docker_exec_npx) nest generate service $(name)
	$(docker_exec_npx) nest generate controller $(name)
	$(docker_exec_npx) nest generate interface $(name)

pipe:
	$(docker_exec_npx) nest generate pipe $(name)

guard:
	$(docker_exec_npx) nest generate guard $(name)

filter:
	$(docker_exec_npx) nest generate filter $(name)

interceptor:
	$(docker_exec_npx) nest generate interceptor $(name)

middleware:
	$(docker_exec_npx) nest generate middleware $(name)

resolver:
	$(docker_exec_npx) nest generate resolver $(name)

# Path: server\src\app.module.ts
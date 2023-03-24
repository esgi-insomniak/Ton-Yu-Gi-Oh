start:
	cd client && make up
	cp -f .env.example .env && cp .env.dev.example .env.dev
	docker compose -f ./docker-compose.yml up -d

start-prod:
	cd client && make up
	cp -f .env.example .env && cp .env.dev.example .env.dev
	docker compose -f ./docker-compose.production.yml up -d

stop:
	cd client && make stop
	docker compose -f ./docker-compose.yml stop

stop-prod:
	cd client && make stop
	docker compose -f ./docker-compose.production.yml stop

down:
	cd client && make down
	docker compose -f ./docker-compose.yml down

down-prod:
	cd client && make down
	docker compose -f ./docker-compose.production.yml down

down-volumes:
	cd client && make down
	docker compose -f ./docker-compose.yml down -v

down-volumes-prod:
	cd client && make down
	docker compose -f ./docker-compose.production.yml down -v
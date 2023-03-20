up:
	cd client && make up
	cp -f .env.example .env && cp .env.test.example .env.test
	docker compose -f ./docker-compose.test.yml up -d

stop:
	cd client && make stop
	docker compose -f ./docker-compose.test.yml stop

down:
	cd client && make down
	docker compose -f ./docker-compose.test.yml down
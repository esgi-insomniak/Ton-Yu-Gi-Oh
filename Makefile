VERSION := $(shell git rev-parse --short HEAD)

copy-env:
	cp -f .env.example .env && cp .env.dev.example .env.dev

generate-workflows:
	deploy/scripts/generate-workflows.sh

build-and-publish:
	# docker build --no-cache -f deploy/docker/Dockerfile -t maeljamin/ton-yugi-$(service):$(VERSION) server/$(service) --target prod --build-arg SERVICE_NAME=$(service)
	# docker push maeljamin/ton-yugi-$(service):$(VERSION)
	deploy/scripts/build-image.sh $(service)
	deploy/scripts/push-image.sh $(service)

start:
	cd app && cd client && make up
	docker compose -f ./docker-compose.yml up -d

start-mutagen:
	cd app && cd client && make up
	mutagen-compose -f ./docker-compose.mutagen.yml up -d

start-prod:
	cd app && cd client && make up
	docker compose -f ./docker-compose.production.yml up -d

stop:
	cd app && cd client && make stop
	docker compose -f ./docker-compose.yml stop

stop-mutagen:
	cd app && cd client && make stop
	mutagen-compose -f ./docker-compose.mutagen.yml stop

stop-prod:
	cd app && cd client && make stop
	docker compose -f ./docker-compose.production.yml stop

down:
	cd app && cd client && make down
	docker compose -f ./docker-compose.yml down

down-mutagen:
	cd app && cd client && make down
	mutagen-compose -f ./docker-compose.mutagen.yml down

down-prod:
	cd app && cd client && make down
	docker compose -f ./docker-compose.production.yml down

down-volumes:
	cd app && cd client && make down
	docker compose -f ./docker-compose.yml down -v

down-volumes-mutagen:
	cd app && cd client && make down
	mutagen-compose -f ./docker-compose.mutagen.yml down -v

down-volumes-prod:
	cd app && cd client && make down
	docker compose -f ./docker-compose.production.yml down -v
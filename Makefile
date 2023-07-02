VERSION := $(shell git rev-parse --short HEAD)
ENV_FILE := .env.dev

copy-env:
	cp -f .env.example .env && cp .env.dev.example .env.dev

generate-workflows:
	deploy/scripts/generate-workflows.sh

build-and-publish:
	# docker build --no-cache -f deploy/docker/Dockerfile -t maeljamin/ton-yugi-$(service):$(VERSION) server/$(service) --target prod --build-arg SERVICE_NAME=$(service)
	# docker push maeljamin/ton-yugi-$(service):$(VERSION)
	deploy/scripts/build-image.sh $(service)
	deploy/scripts/push-image.sh $(service)

feed-db:
	docker compose exec gateway-node yarn command feed-db

local-test:
	docker compose exec $(service) yarn test

test:
	deploy/scripts/test-service.sh $(service)

start:
	docker compose --env-file=$(ENV_FILE) -f ./docker-compose.yml up -d

start-mutagen:
	mutagen-compose -f ./docker-compose.mutagen.yml up -d

stop:
	docker compose --env-file=$(ENV_FILE) -f ./docker-compose.yml stop

stop-mutagen:
	mutagen-compose -f ./docker-compose.mutagen.yml stop

down:
	docker compose --env-file=$(ENV_FILE) -f ./docker-compose.yml down

down-mutagen:
	mutagen-compose -f ./docker-compose.mutagen.yml down

down-volumes:
	docker compose --env-file=$(ENV_FILE) -f ./docker-compose.yml down -v

down-volumes-mutagen:
	mutagen-compose -f ./docker-compose.mutagen.yml down -v
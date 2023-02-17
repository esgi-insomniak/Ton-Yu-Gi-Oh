up:
	docker compose up -d

stop:
	docker compose stop

start:
	docker compose exec node yarn start:dev

update-package:
	docker compose exec node yarn

entity:
	docker compose exec node npx nest generate module $(name)
	docker compose exec node npx nest generate service $(name)
	docker compose exec node npx nest generate controller $(name)
	docker compose exec node npx nest generate interface $(name)
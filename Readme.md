# Nest JS - Yu-Gi-Oh! API

## Fonctionnalités Nest.js (pour le calcul de la note de 15/20)
    ✅ Contrôleurs
        - (server/gateway/src/controllers/cards/card.controller.ts)
    ✅ Providers
        - (server/card-service/src/services/archetype.service.ts)
    ✅ Modules
        - (server/gateway/src/modules/app.module.ts)
    ✅ Pipes
        - (server/gateway/src/interfaces/user-deck-service/userDeck/user-deck.body.dto.ts)
    ✅ Guard
        - (server/gateway/src/services/guard/authorization.guard.ts)
    ✅ Authentification JWT
        - (server/auth-service/src/services/token.service.ts)
    ✅ Gestion d’au moins deux rôles (administrateur, utilisateur, ..)
        - (user & admin)
    ✅ Sécurisation des variables d’environnement
        - (utilisation de SOPS => SOPS.md)
    ✅ Utilisation d’une base de données NoSQL ou SQL
        - (postgres)
    ✅ Validation des données reçues depuis l’extérieur
        - (class-validator)
    ❌ Versionning de toutes les routes
    ❌ Sauvegarde de la base de données à intervalle régulier
    ❌ Logging des erreurs
    ✅ Compression des réponses
    ❌ En-têtes de sécurité
    ✅ Gestion des CORS
        - (server/gateway/src/modules/app.module.ts)
    ❌ Rate-limit

## Bonnes Pratiques (pour le calcul de la note de 15/20)
    ✅ Base de données conteneurisée
        - (docker-compose.yml)
    ✅ Serveur Nest.js conteneurisé
        - (docker-compose.yml)
    ✅ Code commenté
    ✅ Pas de type any
    ✅ Projet documenté
    ✅ Livrable sans variables sensibles
    ✅ Historique Git avec participation de l’ensemble des membres du groupe

## Bonus (pour le calcul de la note de 5/20)
    ✅ Tests unitaires
    ✅ Front-end pour tester l’API
        - (app/client)
    ❌ GraphQL
    ✅ Microservices
        - (server/card-service)
    ✅ OpenAPI (Swagger)
    ❌ Librairie NPM
    ✅ Intégration continue
    ✅ Déploiement continu avec hébergement public

## Les fonctionnalités non demandés 🙂
    ✅ Gestion des websockets
    ✅ Adapter les guards pour fonctionner en http & ws

## Installation

A la racine du projet lancer la commande suivante pour installer les dépendances de l'API Gateway et des microservices:
```bash
make copy-env

docker compose up -d

```

Dans le container Gateway 
```bash
yarn command feed-db
```

Pour lancer le front-end sans le docker
```bash
pnpm --filter client dev || cd client && yarn dev
```

Pour lancer les tests d'un service
```bash
cd server/card-service && yarn test
```
ou 
```bash
make test card-service
```
### Authentification

Lors du register, un mail est envoyé avec un lien pour valider le compte, sur le lien suivant : [Mailer]('http://localhost:9000')

## Swagger 

[Swagger]('http://localhost:8000/api')
# Ton Yu Gi Oh

## Objet

Le projet a pour but de créer un site de gestion de collection de cartes de jeu de yugioh, permettant au joueur de gérer ses decks et d'affronter d'autres joueurs.

# Librairies / Frameworks utilisées

Le projet inclut les fonctionnalités suivantes :

- Front: usage de **React JS**
- Bundling :

    - Configuration **vite** personnalisée basée sur SWC incluant un serveur de développement avec hot reload

- Authentification :

    - Inscription avec Token **JWT** 
    - Validation par email 

- Tests unitaires :

    - **Jest** et **testing-library** installés et préconfigurés
    - **Cypress** test fonctionnels

- Intégration à l'API :

    - Création de service d'appel API avec **Axios**

- Formulaires :

    - Gestion des formulaires avec **React-Hook-Form**
    - Validation déclarative du formulaire par schéma via **zod**

- Routage :

    - **Routing côté navigateur** avec React Router Dom
    - Prise en charge des **routes protégées**

- Autres :

- **React Query** pour la gestion d'état global 
- **TailwindCSS** pour le style

- Environment :

    - [Prod Front]()
    - [Prod API]()

    - [Preprod Front]()
    - [Preprod API]()

# API

- API : usage de **Nest JS**

# Comment initialiser le projet et l'utiliser

1. **Cloner le projet**

   Faire un clone du projet git pour initialiser le repo du projet.

2. **Configurer les variables d'environnement**

   Dans le dossier 'vuejs-starter', créer un fichier '.env.local' et y renseigner les variables d'environnement suivantes :
   ```bash
    VITE_API_URL=https://localhost/
    VITE_ALLOW_ORIGIN=https://localhost/
    VITE_JAWGS_API_KEY={Your_Own_Token}
    ```
    Pour obtenir un token Jawg, vous pouvez vous rendre sur le site suivant : [Jawg IO](https://www.jawg.io/)


3. **Configurer Prettier**

   Vérifier qu'une extension Prettier est installée sur l'IDE, l'installer le cas échéant [https://prettier.io/docs/en/editors.html](https://prettier.io/docs/en/editors.html)

4. **Installer les dépendances et démarrer le projet**

Dans un terminal, se placer dans le dossier 'vuejs-starter' et exécuter les commandes suivantes :

   ```bash
    make build
    make start
   ```

Dans une autre fenetre du terminal, ouvrir le dossier 'api-platform-starter' et exécuter les commandes suivantes :

   ```bash
    make build
    make jwt
    make start
    make migrate 
    make fixtures-purge
   ```
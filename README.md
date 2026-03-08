# 🎥 Cinema Auth & API Gateway

Ce service est le cœur du système de microservices du cinéma. Il remplit deux rôles critiques :

1.  **Authentification Service** : Gère les utilisateurs, le login et la génération de tokens JWT.
2.  **API Gateway** : Point d'entrée unique qui redirige les requêtes vers les autres microservices.

---

## 🏗️ Architecture du Système

Le projet utilise une architecture de microservices où ce service (`authcinema`) agit comme une passerelle (Gateway) :

| Service             | Rôle             | Route Gateway    | URL Interne (Docker)          |
| :------------------ | :--------------- | :--------------- | :---------------------------- |
| **Auth Service**    | Login / JWT      | `/auth`          | Direct (Port 3002)            |
| **Booking Service** | Réservations     | `/api/booking/*` | `http://booking-service:3000` |
| **Movie Service**   | Films            | `/api/movie/*`   | `http://movie-service:3000`   |
| **Cinema Service**  | Cinémas / Salles | `/api/cinema/*`  | `http://cinema-service:3000`  |

---

## 🔐 API Gateway & Sécurité

La Gateway implémente un `ProxyMiddleware` qui :

- Intercepte toutes les requêtes vers `/api/*`.
- **Valide le Token JWT** présent dans le header `Authorization: Bearer <token>`.
- **Enrichit la requête** avant de la transmettre au microservice cible en ajoutant les headers suivants :
  - `x-user-id` : L'ID de l'utilisateur extrait du token.
  - `x-user-roles` : Les rôles de l'utilisateur.

---

## 🛠️ Installation & Démarrage

### 1. Configuration (`.env`)

Copiez le fichier `.env.example` en `.env` et renseignez les variables :

```bash
JWT_SECRET=votre_secret_super_secure
DATABASE_URL="postgresql://admin:ninaAdmin@postgres:5432/auth_service_db"

# URLs des Microservices (utilisées par la Gateway)
BOOKING_SERVICE_URL=http://booking-service:3000
MOVIE_SERVICE_URL=http://movie-service:3000
CINEMA_SERVICE_URL=http://cinema-service:3000

# pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@nina.com
PGADMIN_DEFAULT_PASSWORD=admin
```

### 2. Lancement avec Docker

```bash
docker-compose up -d --build
```

---

## 🗄️ Gestion de la Base de Données

### pgAdmin (Interface Web)

Un outil de gestion de BDD est inclus dans le docker-compose.

- **URL** : [http://localhost:5050](http://localhost:5050)
- **Login** : Défini dans votre `.env` (`PGADMIN_DEFAULT_EMAIL`)
- **Mot de passe** : Défini dans votre `.env` (`PGADMIN_DEFAULT_PASSWORD`)

#### Connecter pgAdmin à Postgres :

- **Host** : `postgres`
- **Port** : `5432`
- **Maintenance Database** : `auth_service_db`
- **Username** : `admin`
- **Password** : `ninaAdmin`

---

## 🚀 Développement local

```bash
# Installation des dépendances
npm install

# Lancer en mode watch (NestJS)
npm run start:dev

# Lancer les tests
npm run test
```

---

## 📜 Licence

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

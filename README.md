# Match Service

## IMT A1 PROMO 2027 - Microservices Architecture
**Anthony ELUECQUE & Alexis YON**

## Domaine Combat - Service Match

### Description
Le service **Match** gère les informations relatives aux matchs, y compris :
- L'état des matchs
- Les participants
- Les dates et scores
- Le vainqueur
- Les invitations et la participation aux matchs

### Technologies utilisées
- ✅ TypeScript (TS)
- ✅ MikroORM & PostgreSQL
- ❌ Envoi des statistiques via RabbitMQ (Non implémenté)

---

## Fonctionnalités principales

### Endpoints REST

| Méthode | Endpoint | Description |
|---------|---------|-------------|
| **GET** | `/match` | Récupérer tous les matchs (ouverts ou par invitation) |
| **POST** | `/match` | Créer un nouveau match (ouvert ou par invitation) |
| **GET** | `/match/{matchId}` | Consulter les détails d’un match |
| **PUT** | `/match/{matchId}` | Mettre à jour l’état d’un match (début, finalisation, etc.) |
| **GET** | `/match?userId={userId}` | Lister les matchs d’un utilisateur (max 3 matchs simultanés) |
| **DELETE** | `/match/{matchId}` | Supprimer un match |
| **POST** | `/match/{matchId}/invite` | Inviter un ou plusieurs utilisateurs à rejoindre un match |
| **POST** | `/match/{matchId}/accept` | Accepter une invitation et rejoindre un match |
| **POST** | `/match/{matchId}/decline` | Refuser une invitation |
| **POST** | `/match/{matchId}/join` | Rejoindre un match public (si les conditions sont remplies) |

---

## Fonctionnalités supplémentaires

### ✅ CI/CD
Un **workflow GitHub Actions** a été mis en place pour :
- Déployer automatiquement la documentation à l'adresse : [Documentation Match Service](https://manamon-archid.github.io/match/)
- Lancer les tests unitaires pour éviter toute régression lors d'un merge sur `main`

### ✅ Tests unitaires
- Utilisation d'une **memory database** pour exécuter les tests sans affecter la base réelle
- Mise en place de **seeders** pour initialiser des jeux de données par défaut

### ✅ Docker
- Un environnement Docker a été mis en place comprenant :
  - L'application (`dist` en mode build)
  - Une base de données **PostgreSQL**

---

## Communication avec les autres microservices

### 🔗 Service d'authentification
- Une branche spécifique **`feature/auth-provider`** a été créée pour intégrer l’authentification
- Problème actuel : les URL sont en dur dans le code du service Auth, ce qui empêche la testabilité
- Solution temporaire : modifier manuellement les adresses IP attribuées

---

## Installation & Exécution

### 📦 Prérequis
- Node.js `>= 20.x`
- Docker `>= 20.x`
- PostgreSQL `>= 15.x`

### 🚀 Installation
```sh
# Cloner le repo
git clone https://github.com/manamon-archid/match.git
cd match

# Installer les dépendances
npm install
```

### 🔧 Configuration
Créer un fichier `.env` à la racine avec :
```
PORT =  "3000"

# DB PART
DB_HOST = "localhost"
DB_PORT = "PORT"
DB_NAME = "YOUR_DB_NAME"
DB_USER = "YOUR_USER_NAME"
DB_PASSWORD = "YOUR_USER_PASSWORD"
```

### 🏃 Lancer le service
```sh
# Démarrer avec Node.js
npm run build
npm run start

# Ou démarrer avec Docker
docker compose up --build -d
```

---

## 📞 Contact
- **Anthony ELUECQUE** - [GitHub](https://github.com/anthony-eluecque)
- **Alexis YON** - [GitHub](https://github.com/mistourr)

---

🚀 _Happy coding !_ 🎮

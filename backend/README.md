
# Backend de l'Application de Gestion de Bibliothèque avec PostgreSQL

Ce backend gère l'authentification et la base de données PostgreSQL pour l'application de gestion de bibliothèque.

## Configuration requise

- Node.js (v14 ou supérieur)
- PostgreSQL (v12 ou supérieur)

## Installation

1. Installez les dépendances :
```
npm install
```

2. Configurez les variables d'environnement :
- Modifiez le fichier `.env` avec vos paramètres de connexion PostgreSQL:
```
DB_USER=votre_utilisateur_postgres
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bibliotheque
JWT_SECRET=votre_secret_jwt_super_securise
PORT=5000
```

3. Créez la base de données manuellement ou utilisez le script fourni :
```
psql -U postgres -f database_init.sql
```

4. Démarrez le serveur :
```
npm run dev
```

## Fonctionnalités

### Authentification

- Connexion administrateur avec email fixe (admin@iset.tn) et mot de passe fixe (admin123)
- Ajout d'étudiants par l'administrateur
- Connexion des étudiants avec les identifiants fournis par l'administrateur

### Routes API

- POST `/api/auth/login` - Connexion (admin ou étudiant)
- GET `/api/auth/me` - Récupérer les informations de l'utilisateur connecté
- POST `/api/auth/register` - Ajouter un étudiant (admin uniquement)
- GET `/api/auth/status` - Vérifier l'état du serveur

## Intégration avec le Frontend

Pour connecter ce backend à votre application React, utilisez les requêtes HTTP vers les endpoints appropriés. Exemple :

```javascript
// Exemple de connexion avec axios
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    
    // Stocker le token et les infos utilisateur
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
```


# Backend de l'Application de Gestion de Bibliothèque

Ce backend gère l'authentification et la base de données pour l'application de gestion de bibliothèque.

## Configuration requise

- Node.js (v14 ou supérieur)
- MongoDB (local ou Atlas)

## Installation

1. Installez les dépendances :
```
npm install
```

2. Configurez les variables d'environnement :
- Créez un fichier `.env` à la racine du projet
- Ajoutez les variables suivantes :
```
MONGODB_URI=mongodb://localhost:27017/bibliotheque
JWT_SECRET=votre_secret_jwt_super_securise
PORT=5000
```

3. Démarrez le serveur :
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

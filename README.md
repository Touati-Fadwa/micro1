
# Bibliothèque ISET Tozeur - Système de Gestion

Ce projet est une application de gestion de bibliothèque pour l'ISET Tozeur qui permet aux administrateurs de gérer les livres, les étudiants et les emprunts, et aux étudiants de consulter et emprunter des livres.

## Fonctionnalités

### Authentification
- Page de connexion avec choix du rôle (Étudiant/Administrateur)
- Authentification sécurisée

### Tableau de bord administrateur
- Vue d'ensemble du nombre de livres, d'emprunts et d'étudiants actifs
- Liste des livres récents par département

### Gestion des livres
- Liste complète des livres avec recherche
- Ajout de nouveaux livres
- Modification et suppression de livres
- Informations détaillées (titre, auteur, catégorie, année, ISBN, disponibilité)

### Gestion des étudiants
- Liste des étudiants avec recherche
- Ajout de nouveaux étudiants
- Suivi des emprunts par étudiant

### Gestion des emprunts
- Suivi de tous les emprunts en cours
- Gestion des retours

### Portail étudiant
- Consultation des livres disponibles
- Emprunt de livres
- Suivi des emprunts personnels

## Utilisation

### Connexion
- Pour accéder en tant qu'administrateur:
  - Email: admin@iset.tn
  - Mot de passe: admin
  - Rôle: Administrateur

- Pour accéder en tant qu'étudiant:
  - Email: fadwatouati58@gmail.com
  - Mot de passe: etudiant
  - Rôle: Étudiant

### Naviguer dans l'application
L'application utilise une barre latérale pour la navigation entre les différentes fonctionnalités.

## Développement

Ce projet est développé avec:
- React
- TypeScript
- Tailwind CSS
- React Router
- Context API pour la gestion de l'état

Note: Cette version de l'application est uniquement front-end, elle utilise des données statiques pour simuler un backend.

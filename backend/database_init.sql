
-- Création de la base de données
CREATE DATABASE bibliotheque;

-- Connexion à la base de données
\c bibliotheque

-- Table des utilisateurs (sera gérée par Sequelize, mais voici la structure)
CREATE TABLE IF NOT EXISTS "Users" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) CHECK (role IN ('admin', 'student')) DEFAULT 'student',
  department VARCHAR(255) DEFAULT '',
  "borrowedBooks" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Commentaire: En pratique, Sequelize créera cette table automatiquement
-- Ce script est fourni pour référence et initialisation manuelle si nécessaire

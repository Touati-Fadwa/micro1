# Étape de build
FROM node:20-alpine as build
WORKDIR /app

# Copier seulement les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Ensuite copier le reste du code
COPY . .

# Compiler ton app (si besoin)
RUN npm run build

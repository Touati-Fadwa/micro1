# Étape 1 : Build de l'application
FROM node:20 AS build

# Dossier de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le code source
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Supprime la config Nginx par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers buildés depuis l'étape de build
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

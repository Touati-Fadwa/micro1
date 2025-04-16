# Étape 1 : build de l'application React
FROM node:20-alpine AS build

WORKDIR /app

# Copie les fichiers nécessaires

RUN npm install

COPY . .

# Build de l'application React
RUN npm run build

# Étape 2 : Serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copie du build dans le dossier Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Optionnel : copie de ta config Nginx personnalisée si besoin
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

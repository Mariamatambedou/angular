# Utiliser une image de base Node.js pour la build de l'application Angular
FROM node:18 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Builder l'application Angular
RUN npm run build --prod

# Utiliser une image de base Nginx pour servir l'application Angular
FROM nginx:alpine

# Copier les fichiers buildés dans le répertoire de Nginx
COPY --from=build /app/dist/frontend-angular /usr/share/nginx/html

# Exposer le port que Nginx utilise
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]


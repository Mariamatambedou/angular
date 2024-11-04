# Étape 1: Utiliser une image de base Nginx pour servir l'application Angular
FROM nginx:alpine

# Définir le répertoire de travail pour Nginx
WORKDIR /usr/share/nginx/html

# Copier les fichiers Angular pré-buildés dans le répertoire de Nginx
COPY dist/frontend-ang-app/browser /usr/share/nginx/html

# Exposer le port que Nginx utilise
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]


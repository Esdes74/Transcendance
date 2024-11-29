FROM debian:12

# Récupération du volume où est envoyé le code
ARG VOLUME PORT

# Création et sauvegarde de la variable pour la suite de l'exécution
ENV VOLUME=$VOLUME PORT=$PORT
RUN mkdir -p $VOLUME

# Installation des dépendances système
RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install nginx openssl curl

# Installation de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

# Génération d'un certificat SSL auto-signé pour localhost
RUN openssl req -x509 -nodes -out /etc/nginx/crt.pem -keyout /etc/nginx/privkey.pem \
    -subj "/C=FR/ST=Paris/L=Paris/O=Local/OU=Dev/CN=*.local"

# Configuration de Nginx
COPY config/nginx.conf /etc/nginx/nginx.conf
RUN sed -i "s|\${NGINX_VOLUME}|$VOLUME|g" /etc/nginx/nginx.conf

# Définir le répertoire de travail pour Node.js et Webpack
WORKDIR /app

# Copier les fichiers nécessaires pour Webpack dans le conteneur
COPY config/webpack.config.js /app/webpack.config.js
COPY config/package.json /app/package.json

# Initialisation de Node.js dans le conteneur et installation des dépendances
RUN npm install

# Exposition des ports
EXPOSE 443

# Commande pour construire et démarrer l'application
CMD ["sh", "-c", "npm run build && nginx -g 'daemon off;'"]

# FROM debian:12

# # Récupération du volume où est envoyé le code
# ARG VOLUME PORT

# # Création et sauvegarde de la variable pour la suite de l'éxécution
# ENV VOLUME=$VOLUME PORT=$PORT
# RUN mkdir -p $VOLUME

# #NGINX

# RUN	apt-get -y update
# RUN	apt-get -y upgrade
# RUN	apt-get -y install nginx
# RUN	apt-get -y install openssl

# # Générer un certificat SSL auto-signé pour localhost et *.local
# RUN openssl req -x509 -nodes -out /etc/nginx/crt.pem -keyout /etc/nginx/privkey.pem \
#     -subj "/C=FR/ST=Paris/L=Paris/O=Local/OU=Dev/CN=*.local"

# COPY	config/nginx.conf /etc/nginx/nginx.conf

# RUN	sed -i "s|\${NGINX_VOLUME}|$VOLUME|g" /etc/nginx/nginx.conf

# # Exposition du port
# EXPOSE 443

# # démarre l'application
# CMD ["nginx", "-g", "daemon off;"]

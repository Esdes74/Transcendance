# Installation de javascript pour bootstrap
FROM node:18

# Récupération du volume où est envoyé le code
ARG VOLUME PORT

# Création et sauvegarde de la variable pour la suite de l'éxécution
ENV VOLUME=$VOLUME PORT=$PORT

# Me mettre au bon endroit pour le reste du conteneur
RUN mkdir -p $VOLUME
WORKDIR /app

#NGINX

RUN	apt-get -y update
RUN	apt-get -y upgrade
RUN	apt-get -y install nginx
RUN	apt-get -y install openssl

RUN	openssl req -x509 -nodes -out /etc/nginx/crt.pem -keyout /etc/nginx/privkey.pem -subj "/C=FR"
COPY	config/nginx.conf /etc/nginx/nginx.conf
RUN	mkdir /var/www/html/myproject
COPY	files /var/www/html/myproject

EXPOSE	443

# Copie du package
COPY config/package.json .

# Remplace le volume dans le package.json par le chemin contenu dans le volume
RUN sed -i 's|$VOLUME|'$VOLUME'|g' package.json

# Installe les dépendances
RUN npm install

# Construit l'application
RUN npm run build

# Exposition du port
EXPOSE $PORT

# démarre l'application

CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm", "start"]

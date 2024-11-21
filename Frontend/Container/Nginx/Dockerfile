FROM debian:12

# Récupération du volume où est envoyé le code
ARG VOLUME PORT

# Création et sauvegarde de la variable pour la suite de l'éxécution
ENV VOLUME=$VOLUME PORT=$PORT
RUN mkdir -p $VOLUME

#NGINX

RUN	apt-get -y update
RUN	apt-get -y upgrade
RUN	apt-get -y install nginx
RUN	apt-get -y install openssl

# Générer un certificat SSL auto-signé pour localhost et *.local
RUN openssl req -x509 -nodes -out /etc/nginx/crt.pem -keyout /etc/nginx/privkey.pem \
    -subj "/C=FR/ST=Paris/L=Paris/O=Local/OU=Dev/CN=*.local"

COPY	config/nginx.conf /etc/nginx/nginx.conf

RUN	sed -i "s|\${NGINX_VOLUME}|$VOLUME|g" /etc/nginx/nginx.conf

# Exposition du port
EXPOSE 443
EXPOSE 80

# démarre l'application
CMD ["nginx", "-g", "daemon off;"]

# Installation de javascript pour bootstrap
FROM node:18

# Récupération du volume où est envoyé le code
ARG VOLUME PORT

# Création et sauvegarde de la variable pour la suite de l'éxécution
ENV VOLUME=$VOLUME PORT=$PORT

# Me mettre au bon endroit pour le reste du conteneur
RUN mkdir -p $VOLUME
WORKDIR /app

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
CMD ["npm", "start"]
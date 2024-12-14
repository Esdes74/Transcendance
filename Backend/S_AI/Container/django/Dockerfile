FROM python:3.12

# Réception des variables VOLUME et LAUNCH données en argument du build
ARG VOLUME LAUNCH

# Création de la variable d'environnement LAUNCH pour l'entrypoint ensuite
ENV VOLUME=$VOLUME LAUNCH=$LAUNCH

# Création du répertoire de travaille
RUN mkdir -p $LAUNCH $VOLUME

# Suppression des fichiers .pyc générés par la compilation de pyhon
ENV PYTHONDONTWRITEBYTEODE 1 
# Suppression du buffering de python, ce qui permet de lui faire
# afficher toutes les sorties a la suite les unes des autres
# (pratique pour les logs en temps réelle)
ENV PYTHONUNBUFFERED 1

# Installe netcat pour la vérification de l'etat de la base de donnée avant connection
RUN apt-get update && apt-get upgrade -y && \
	apt-get install netcat-traditional postgresql-client -y && \
	rm -rf /var/lib/apt/lists/*

# Mise a jour de pip pour s'assurer qu'il soit compatible avec les paquets a installer
RUN pip install --upgrade pip

# Installation des dépendances
COPY ./tools/requirements.txt $VOLUME/
RUN pip install --no-cache-dir -r $VOLUME/requirements.txt

# Copie du script de lancement et modification des droits et des
# changements potentiellement fait par windows
COPY ./tools/launch.sh $LAUNCH/launch.sh
RUN sed -i 's/\r$//g' $LAUNCH/launch.sh
RUN chmod +x $LAUNCH/launch.sh
CMD ["uvicorn", "AI.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
#ENTRYPOINT ["bash", "-c", "$LAUNCH/launch.sh"]

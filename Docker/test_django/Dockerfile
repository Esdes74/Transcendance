FROM esdes/postgresql:root_latest

# Mettre à jour les paquets et installer les dépendances nécessaires
RUN apt-get update && apt-get upgrade && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Création du répertoire du code de l'application et copiage de l'applis a cet emplacement
RUN mkdir /run/app
COPY ./app/ /run/app

# On déplace de répertoire de travaille a app
WORKDIR /run/app

# Installer Django directement via pip
RUN pip install --no-cache-dir -r requirements.txt

# Création du répertoire du script de lancement du serveur et copie
RUN mkdir /run/launch
COPY ./tools/launch.sh /run/launch
RUN chmod +x /run/launch/launch.sh

# Exposition du port 8000 pour ouvrire le site
EXPOSE 8000

# Lancement du script au démarrage du conteneur
ENTRYPOINT ["bash", "/run/launch/launch.sh"]
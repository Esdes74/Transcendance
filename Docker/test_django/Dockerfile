# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 15:36:36 by eslamber          #+#    #+#              #
#    Updated: 2024/08/27 17:50:05 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# FROM debian:bullseye-slim
FROM esdes/postgresql:alive_latest

# Mettre à jour les paquets et installer les dépendances nécessaires
RUN apt-get update && apt-get upgrade && apt-get install -y \
    python3 \
    python3-pip \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Création du répertoire du code de l'application et copiage de l'applis a cet emplacement
RUN mkdir /run/app && chown -R root:root /run
COPY ./app/ /run/app
RUN chmod +x /run/app/manage.py

# On déplace de répertoire de travaille a app
# WORKDIR /run/app

# Installer Django directement via pip
RUN pip install --no-cache-dir -r /run/app/requirements.txt

# Création du répertoire du script de lancement du serveur et copie
COPY ./tools/launch.sh /run/app
RUN chmod +x /run/app/launch.sh

# Exposition du port 8000 pour ouvrire le site
EXPOSE 8000

# Lancement du script au démarrage du conteneur
ENTRYPOINT ["bash", "/run/app/launch.sh"]
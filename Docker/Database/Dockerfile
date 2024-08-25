# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Dockerfile                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/25 12:22:47 by eslamber          #+#    #+#              #
#    Updated: 2024/08/25 12:23:08 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# Installation depuis le debian slim, qui est une version plus légère de debian
FROM debian:bullseye-slim

# RUN apt-get install apt-utils -y
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y --no-install-recommends \
	apt-utils \
	sudo \
	postgresql \
	postgresql-contrib

# Définir le chemin pour les binaires PostgreSQL
# Cette ligne sert surtout pour que l'utilisateur postgres reconnaisse les commandes utilisées dnas le script
ENV PATH="/usr/lib/postgresql/13/bin:/usr/lib/postgresql/bin:/usr/local/bin:/usr/bin:/bin"

# Création du répertoire de travaille de postgresql
RUN mkdir -p /var/lib/postgresql/data && \
	chown -R postgres:postgres /var/lib/postgresql
WORKDIR /var/lib/postgresql

# Copie du script d'initialisation
COPY conf/init.sh .
RUN chmod +x init.sh

# Passage sur le user e postgresql
USER postgres

# Le script d'initilisation en point d'entrée
ENTRYPOINT ["bash", "init.sh"]

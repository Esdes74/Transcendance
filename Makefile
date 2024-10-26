# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/02 14:18:49 by eslamber          #+#    #+#              #
#    Updated: 2024/10/26 09:17:28 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# Les volumes des bases de données sur la machine
PONG_DB := /home/eslamber/data/Auth
API_DB := /home/eslamber/data/API

# Les networks a créer et gérer
NETWK := backend \
		 frontend \

# Les diférents composes qu'on a
API_DOCKER := Docker/API/docker-compose.yml
AUTH_DOCKER := Docker/Auth/docker-compose.yml
FRONT_DOCKER := Docker/Front/docker-compose.yml
DOCKER := docker-compose.yml

# Definitions of differents printed colors
LIGHTBLUE := '\e[0;32m'
RED := '\e[0;31m'
NEUTRAL := '\e[0m'

# Build les images et seulement les images
build:
	docker-compose -f $(DOCKER) up -d --build
# docker-compose -f $(API_DOCKER) up -d --build
# docker-compose -f $(AUTH_DOCKER) up -d --build
# docker-compose -f $(FRONT_DOCKER) up -d --build

# Lancement du serveur
all: dir $(NETWK)
	docker-compose -f $(DOCKER) up -d --build
# docker-compose -f $(API_DOCKER) up -d --build
# docker-compose -f $(AUTH_DOCKER) up -d --build
# docker-compose -f $(FRONT_DOCKER) up -d --build

$(NETWK):
	docker network create $@

# Lance le restart des services
restart: stop build

# Regle pour activer docker
start:
	sudo systemctl start docker

sys: start build

sysall: start all

# Supprime les repos des bases de données des sarvices sur la machine
rm_dir:
	@echo -e $(LIGHTBLUE)Remove $(RED)Data directorie$(NEUTRAL)
	sudo rm -rf $(PONG_DB)
	sudo rm -rf $(API_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

# Créer les répos des bases de données sur la machine pour les différents services
dir:
	@echo -e $(LIGHTBLUE)Making $(RED)Data directorie$(NEUTRAL)
	sudo mkdir -p $(PONG_DB)
	sudo mkdir -p $(API_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

# Commandes de clean du docker
fclean: rmi builder_rm system_rm volume_rm

stop:
	docker stop $$(docker ps -aq)										# Arrêter tous les conteneurs en cours d'exécution
	docker-compose -f $(DOCKER) down
# docker-compose -f $(API_DOCKER) down
# docker-compose -f $(AUTH_DOCKER) down
# docker-compose -f $(FRONT_DOCKER) down

down:
	docker-compose -f $(DOCKER) down
# docker-compose -f $(API_DOCKER) down
# docker-compose -f $(AUTH_DOCKER) down
# docker-compose -f $(FRONT_DOCKER) down

rm:
	docker rm -f $$(docker ps -aq)										# Supprimer tous les conteneurs
rmi:
	docker rmi -f $$(docker images -q)									# Supprimer toutes les images

volume_rm:
	docker volume rm -f $$(docker volume ls -q)								# Supprimer tous les volumes

builder_rm:
	docker builder prune -a -f											# Nettoyer le cache de Docker (build cache)

system_rm:
	docker system prune -a --volumes -f									# Nettoyer le cache général et les données non utilisées

network_rm:
	docker network rm $$(docker network ls | grep -vE 'NETWORK|DRIVER|ID|SERVER|SCOPE|bridge|host|none')	# Supprimer tous les réseaux

re: rmi volume_rm builder_rm system_rm rm_dir all

.PHONY: all stop rm rmi volume_rm builder_rm system_rm network_rm fclean dir rm_dir down re build restart start sys sysall
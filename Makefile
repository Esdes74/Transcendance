# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/02 14:18:49 by eslamber          #+#    #+#              #
#    Updated: 2024/09/03 12:31:56 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# Les volumes des bases de données sur la machine
PONG_DB := /home/eslamber/data/Pong
API_DB := /home/eslamber/data/API

# Les networks a créer et gérer
NETWK := backend

# Les diférents composes qu'on a
API_DOCKER := Docker/API/docker-compose.yml
PONG_DOCKER := Docker/Pong/docker-compose.yml

# Definitions of differents printed colors
LIGHTBLUE := '\e[0;32m'
RED := '\e[0;31m'
NEUTRAL := '\e[0m'

# Lancement du serveur
all: dir build stop
	docker-compose -f $(API_DOCKER) up -d --build
	docker-compose -f $(PONG_DOCKER) up -d --build

# Build des images a l'aide d'un seul docker-compose
# puis rebascule sur la regle all qui le stop et relance tous les services
build:
	docker network create $(NETWK)
	docker-compose -f $(API_DOCKER) up -d --build

# Lance le restart des services
restart:
	docker-compose -f $(API_DOCKER) restart -d
	docker-compose -f $(PONG_DOCKER) restart -d

# Supprime les repos des bases de données des sarvices sur la machine
rm_dir:
	@echo -e $(LIGHTBLUE)Remove $(RED)Data directorie$(NEUTRAL)
	rm -rf $(PONG_DB)
	rm -rf $(API_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

# Créer les répos des bases de données sur la machine pour les différents services
dir:
	@echo -e $(LIGHTBLUE)Making $(RED)Data directorie$(NEUTRAL)
	mkdir -p $(PONG_DB)
	mkdir -p $(API_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

# Commandes de clean du docker
fclean: rmi builder_rm system_rm rm_dir network_rm volume_rm

stop:
	docker stop $$(docker ps -aq)										# Arrêter tous les conteneurs en cours d'exécution
	docker-compose -f $(API_DOCKER) down
	docker-compose -f $(PONG_DOCKER) down

down:
	docker-compose -f $(API_DOCKER) down
	docker-compose -f $(PONG_DOCKER) down

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

.PHONY: all stop rm rmi volume_rm builder_rm system_rm network_rm fclean dir rm_dir down re build restart
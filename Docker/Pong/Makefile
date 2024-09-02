# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/25 12:22:38 by eslamber          #+#    #+#              #
#    Updated: 2024/09/02 13:56:27 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

V_DB := /home/eslamber/data/Pong

DOCKER := docker-compose.yml

# Definitions of differents printed colors
LIGHTBLUE := '\e[0;32m'
RED := '\e[0;31m'
NEUTRAL := '\e[0m'

all: dir
	sudo docker-compose -f $(DOCKER) up --build

restart:
	sudo docker-compose -f $(DOCKER) restart

rm_dir:
	@echo -e $(LIGHTBLUE)Remove $(RED)Data directorie$(NEUTRAL)
	sudo rm -rf $(V_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

dir:
	@echo -e $(LIGHTBLUE)Making $(RED)Data directorie$(NEUTRAL)
	sudo mkdir -p $(V_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

fclean: rmi builder_rm system_rm rm_dir network_rm volume_rm

stop:
	sudo docker stop $$(sudo docker ps -aq)										# Arrêter tous les conteneurs en cours d'exécution
	sudo docker-compose -f $(DOCKER) down

down:
	sudo docker-compose -f $(DOCKER) down

rm:
	sudo docker rm -f $$(sudo docker ps -aq)										# Supprimer tous les conteneurs
rmi:
	sudo docker rmi -f $$(sudo docker images -q)									# Supprimer toutes les images

volume_rm:
	sudo docker volume rm -f $$(sudo docker volume ls -q)								# Supprimer tous les volumes

builder_rm:
	sudo docker builder prune -a -f											# Nettoyer le cache de Docker (build cache)

system_rm:
	sudo docker system prune -a --volumes -f									# Nettoyer le cache général et les données non utilisées

network_rm:
	sudo docker network rm $$(sudo docker network ls | grep -vE 'NETWORK|DRIVER|ID|SERVER|SCOPE|bridge|host|none')	# Supprimer tous les réseaux

re: rmi volume_rm builder_rm system_rm rm_dir all

.PHONY: all stop rm rmi volume_rm builder_rm system_rm network_rm fclean dir rm_dir down re
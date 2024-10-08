# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tdutel <tdutel@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/25 12:22:38 by eslamber          #+#    #+#              #
#    Updated: 2024/10/07 16:38:53 by tdutel           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

V_DB := /home/tdutel/data/Pong_back

DOCKER := docker-compose.yml

# Definitions of differents printed colors
LIGHTBLUE := '\e[0;32m'
RED := '\e[0;31m'
NEUTRAL := '\e[0m'

all: dir
	docker-compose -f $(DOCKER) up --build

restart:
	docker-compose -f $(DOCKER) restart

rm_dir:
	@echo -e $(LIGHTBLUE)Remove $(RED)Data directorie$(NEUTRAL)
	 rm -rf $(V_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

dir:
	@echo -e $(LIGHTBLUE)Making $(RED)Data directorie$(NEUTRAL)
	 mkdir -p $(V_DB)
	@echo -e $(LIGHTBLUE)done$(NEUTRAL)

fclean: rmi builder_rm system_rm rm_dir network_rm volume_rm

stop:
	docker stop $$(docker ps -aq)										# Arrêter tous les conteneurs en cours d'exécution
	docker-compose -f $(DOCKER) down

down:
	docker-compose -f $(DOCKER) down

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

.PHONY: all stop rm rmi volume_rm builder_rm system_rm network_rm fclean dir rm_dir down re restart

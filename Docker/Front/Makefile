# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/04 12:55:15 by eslamber          #+#    #+#              #
#    Updated: 2024/09/20 18:20:10 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

DOCKER := docker-compose.yml

# Les networks a créer et gérer
NETWK := frontend

# Definitions of differents printed colors
LIGHTBLUE := '\e[0;32m'
RED := '\e[0;31m'
NEUTRAL := '\e[0m'

build:
	docker-compose -f $(DOCKER) up --build

all: dir $(NETWK)
	docker-compose -f $(DOCKER) up --build

restart:
	docker-compose -f $(DOCKER) restart

$(NETWK):
	docker network create $@

fclean: rmi builder_rm system_rm network_rm volume_rm

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

re: rmi volume_rm builder_rm system_rm all

.PHONY: all stop rm rmi volume_rm builder_rm system_rm network_rm fclean down re restart
# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/23 19:50:54 by lmohin            #+#    #+#              #
#    Updated: 2025/01/26 21:48:38 by lmohin           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# Les networks a créer et gérer
NETWK := backend frontend api_db auth_db pong_db tournament_db

# Les diférents composes qu'on a
DOCKER := docker-compose.yml

# Definitions of differents printed colors
LIGHTBLUE := '\e[0;32m'
RED := '\e[0;31m'
NEUTRAL := '\e[0m'

all:
	bash init.sh
	docker compose -f $(DOCKER) up -d --build

$(NETWK):
	docker network create $@

re: stop all

restart: stop all

# Regle pour activer docker
start:
	sudo systemctl start docker

sys: start all

sysall: start all

# Commandes de clean du docker
fclean: rmi builder_rm system_rm volume_rm

stop:
	docker stop $$(docker ps -aq)										# Arrêter tous les conteneurs en cours d'exécution

down:	stop
	docker compose -f $(DOCKER) down

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

re: stop fclean all

.PHONY: all stop rm rmi volume_rm builder_rm system_rm network_rm fclean down re build restart start sys sysall

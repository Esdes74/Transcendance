# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/20 17:45:21 by eslamber          #+#    #+#              #
#    Updated: 2024/09/23 09:59:14 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

# while ! pg_isready -h $PSQL_HOST -p $SQL_PORT -U $SQL_USER > /dev/null 2>&1; do
#   echo "En attente de PostgreSQL..."
#   sleep 2
# done

# psql -h postgreSQL_Auth -U $SQL_USER -d $SQL_DATABASE

# # Attendre que PostgreSQL soit prêt
# until PGPASSWORD=$SQL_PASSWORD psql -h $SQL_HOST -U $SQL_USER -d $SQL_DATABASE -c '\q'; do
#   echo "PostgreSQL est en attente..."
#   sleep 2
# done

# # Exécuter des commandes SQL avec psql
# # Création du nouvel utilisateur
# # Donner les droit a ce nouvel utilisateur
# PGPASSWORD=$SQL_PASSWORD psql -h $SQL_HOST -U $SQL_USER -d $SQL_DATABASE <<-EOSQL
# 	CREATE USER $POSTGRES_USER WITH PASSWORD \'$POSTGRES_PASSWORD\';
# 	GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;
# EOSQL

# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: Invalid date        by                   #+#    #+#              #
#    Updated: 2024/11/27 13:24:42 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #



#!/bin/bash

while ! pg_isready -h pong_psql -U $POSTGRES_USER -d $POSTGRES_DB; do
	echo "attente du service postgresql"
	sleep 1
done

cd $VOLUME

# Créer des migrations
python3 manage.py makemigrations

# Appliquer les migrations
python3 manage.py migrate

# Créer un superutilisateur automatiquement
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ] && [ "$DJANGO_SUPERUSER_EMAIL" ]; then
    python3 manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL
fi

# Lancer le serveur Django
uvicorn Pong.asgi:application --host 0.0.0.0 --port 8000

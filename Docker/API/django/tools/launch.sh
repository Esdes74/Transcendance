# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/08/30 17:23:16 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

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
# python3 $VOLUME/manage.py runserver 0.0.0.0:8000

# Lancer le serveur Django uvicorn

uvicorn api.asgi:application --host 0.0.0.0 --port 8000

# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/09/06 16:56:36 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash
# Attente que le conteneur pong_web soit en ligne (ping)
while ! nc -z pong_web 8000; do
  echo "Attente que le conteneur pong_web soit en ligne..."
  sleep 1
done

# Attente de tournament_psql
while ! pg_isready -h tournament_psql -U $POSTGRES_USER -d $POSTGRES_DB; do
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
uvicorn Tournament.asgi:application --host 0.0.0.0 --port 8000

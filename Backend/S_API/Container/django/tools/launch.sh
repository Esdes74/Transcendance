# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/11/21 16:31:17 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

# Attente que le conteneur front soit en ligne (ping)
while ! nc -z front 443; do
  echo "Attente que le conteneur front soit en ligne..."
  sleep 1
done

# Maintenant, récupère l'adresse IP
FRONT_IP=$(getent hosts front | awk '{ print $1 }')
export FRONT_IP

# Tu peux maintenant utiliser l'IP comme une variable d'environnement ou la sauvegarder
while ! pg_isready -h api_psql -U $POSTGRES_USER -d $POSTGRES_DB; do
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
uvicorn djpr_API.asgi:application --host 0.0.0.0 --port 8000
# python3 manage.py runserver 0.0.0.0:8000
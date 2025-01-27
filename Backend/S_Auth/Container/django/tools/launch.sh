# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2025/01/27 12:16:14 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

while ! pg_isready -h auth_psql -U $POSTGRES_USER -d $POSTGRES_DB; do
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
python3 manage.py runserver 0.0.0.0:8000

# # Définir DJANGO_SETTINGS_MODULE
# export DJANGO_SETTINGS_MODULE="djpr_Registery.settings"

# # Démarrer Redis
# redis-server --daemonize yes

# # Démarrer Celery
# celery -A djpr_Registery worker --loglevel=info
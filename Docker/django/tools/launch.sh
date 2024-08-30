# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/08/30 16:54:30 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

# Lancement de la base de donnée sans quoi rien ne fonctionnerait
# Pas sur que ce soit toujours utile
# su - postgres -c "pg_ctl -D /var/lib/postgresql/data -l logfile start"
# su - "$USER" -c "/usr/lib/postgresql/13/bin/initdb --locale=$LANG -D $DATA_DIR"
# su - "$USER" -c "/usr/lib/postgresql/13/bin/pg_ctl -D "$DATA_DIR" -l /var/lib/postgresql/logfile start"

# python3 $VOLUME/manage.py dbshell

# sleep 10

# Créer des migrations
python3 $VOLUME/manage.py makemigrations

# Appliquer les migrations
python3 $VOLUME/manage.py migrate

# Collecter les fichiers statiques
# python3 $VOLUME/manage.py collectstatic --noinput

# Créer un superutilisateur automatiquement
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ] && [ "$DJANGO_SUPERUSER_EMAIL" ]; then
    python3 $VOLUME/manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL
fi

# Lancer le serveur Django
python3 $VOLUME/manage.py runserver 0.0.0.0:8000
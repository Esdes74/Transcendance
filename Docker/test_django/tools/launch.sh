# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/08/27 17:20:17 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/sh

# Lancement de la base de donnée sans quoi rien ne fonctionnerait
# Pas sur que ce soit toujours utile
# su - postgres -c "pg_ctl -D /var/lib/postgresql/data -l logfile start"
su - "$USER" -c "/usr/lib/postgresql/13/bin/pg_ctl -D "$DATA_DIR" -l /var/lib/postgresql/logfile start"

# python3 manage.py dbshell

# Créer des migrations
python3 /run/app/manage.py makemigrations

# Appliquer les migrations
python3 /run/app/manage.py migrate

# Collecter les fichiers statiques
python3 /run/app/manage.py collectstatic --noinput

# Créer un superutilisateur automatiquement
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ] && [ "$DJANGO_SUPERUSER_EMAIL" ]; then
    python3 /run/app/manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL
fi

# Lancer le serveur Django
python3 /run/app/manage.py runserver 0.0.0.0:8000
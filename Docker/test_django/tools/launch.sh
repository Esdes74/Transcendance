#!/bin/sh

# Lancement de la base de donnée sans quoi rien ne fonctionnerait
pg_ctl -D /var/lib/postgresql/data -l logfile start

# Créer des migrations
python3 manage.py makemigrations

# Appliquer les migrations
python3 manage.py migrate

# Collecter les fichiers statiques
python3 manage.py collectstatic --noinput

# Créer un superutilisateur automatiquement
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ] && [ "$DJANGO_SUPERUSER_EMAIL" ]; then
    python3 manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL
fi

# Lancer le serveur Django
python3 manage.py runserver 0.0.0.0:8000
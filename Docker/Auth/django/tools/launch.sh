# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/09/23 16:12:57 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

# Appliquer les migrations (sans générer de nouvelles migrations inutilement)
python3 $VOLUME/manage.py migrate

# Créer un superutilisateur automatiquement (si non existant)
if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ] && [ "$DJANGO_SUPERUSER_EMAIL" ]; then
    python3 $VOLUME/manage.py shell -c "from django.contrib.auth.models import User; \
    User.objects.filter(username='$DJANGO_SUPERUSER_USERNAME').exists() or \
    User.objects.create_superuser('$DJANGO_SUPERUSER_USERNAME', '$DJANGO_SUPERUSER_EMAIL', '$DJANGO_SUPERUSER_PASSWORD')"
fi

# Lancer le serveur Django
python3 $VOLUME/manage.py runserver 0.0.0.0:8000




# #!/bin/bash

# # Créer des migrations
# python3 $VOLUME/manage.py makemigrations

# # Appliquer les migrations
# python3 $VOLUME/manage.py migrate

# # Créer un superutilisateur automatiquement
# if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ] && [ "$DJANGO_SUPERUSER_EMAIL" ]; then
#     python3 $VOLUME/manage.py createsuperuser --noinput --username $DJANGO_SUPERUSER_USERNAME --email $DJANGO_SUPERUSER_EMAIL
# fi

# # Lancer le serveur Django
# python3 $VOLUME/manage.py runserver 0.0.0.0:8000
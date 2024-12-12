# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/08/26 16:19:02 by eslamber          #+#    #+#              #
#    Updated: 2024/12/12 21:53:26 by lmohin           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

cd $VOLUME

# Créer des migrations
python3 manage.py makemigrations

# Appliquer les migrations
python3 manage.py migrate

# Lancer le serveur Django
uvicorn Pong.asgi:application --host 0.0.0.0 --port 8005

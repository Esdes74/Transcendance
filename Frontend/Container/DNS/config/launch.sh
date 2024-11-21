# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    launch.sh                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/11/15 17:52:30 by eslamber          #+#    #+#              #
#    Updated: 2024/11/20 13:35:31 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

#!/bin/bash

# Attente que front soit dispo
while ! nc -z front 443; do
  echo "Attente que le conteneur front soit en ligne..."
  sleep 1
done

echo "done"

# Lancement de dns
dnsmasq --no-daemon --conf-file=/etc/dnsmasq.conf

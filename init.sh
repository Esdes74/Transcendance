#!/bin/bash

POST_IP=$(ifconfig | grep -A 3 enp | grep 'inet ' | grep -v "127.0.0.1" | awk '{print $2}' | head -n 1)

IFS='.' read -r -a parts <<< "$POST_IP"  # Diviser l'adresse IP en parties

# Supprimer le premier "1" de la deuxième partie si nécessaire
second_part="${parts[1]}"
second_part="${second_part:1}"
# if [[ $second_part == 1* ]]; then
# 	second_part="${second_part:1}"
# fi

SERVER_IP="z${second_part}r${parts[2]}p${parts[3]}"

sed -i "s/^SERVER_IP='[^']*'/SERVER_IP='$SERVER_IP'/" .env
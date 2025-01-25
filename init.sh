#!/bin/bash

# Détection du système d'exploitation pour compatibilité avec sed
if [[ "$OSTYPE" == "darwin"* ]]; then
    SED_OPTS="-i ''"  # Option pour macOS
else
    SED_OPTS="-i"  # Option pour Linux
fi

# Récupérer l'adresse IP locale (exclure 127.0.0.1)
POST_IP=$(ifconfig | grep -E 'inet ' | grep -v "127.0.0.1" | awk '{print $2}' | head -n 1)

# Vérifier si une adresse IP a été trouvée
if [[ -z "$POST_IP" ]]; then
    echo "Erreur : Impossible de récupérer l'adresse IP."
    exit 1
fi

# Diviser l'adresse IP en parties
IFS='.' read -r -a parts <<< "$POST_IP"

# Manipuler la deuxième partie de l'IP
second_part="${parts[1]}"
second_part="${second_part:1}"  # Supprimer le premier caractère
if [[ $second_part == 1* ]]; then
    second_part="${second_part:1}"  # Supprime encore si ça commence par "1"
fi

# Construire la variable SERVER_IP
SERVER_IP="z${second_part}r${parts[2]}p${parts[3]}"

# Vérifier si le fichier .env existe, sinon le créer
if [[ ! -f .env ]]; then
    echo ".env non trouvé, création du fichier..."
    touch .env
fi

# Mettre à jour ou ajouter la variable SERVER_IP dans .env
if grep -q "^SERVER_IP=" .env; then
    sed $SED_OPTS "s/^SERVER_IP='[^']*'/SERVER_IP='$SERVER_IP'/" .env
else
    echo "SERVER_IP='$SERVER_IP'" >> .env
fi

echo "Mise à jour de SERVER_IP avec la valeur : $SERVER_IP"

# Attendre API-WEB
until nc -z api_web 8000; do
	sleep 4
done

# Lancer nginx tache principale
nginx -g "daemon off;"

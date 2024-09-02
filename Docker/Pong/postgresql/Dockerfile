# Récupération de postgres
FROM postgres:13

# Expositiondu port pour communiquer
EXPOSE $USER_STATS_DB_PORT

# Récupération des variables pour crée la base de donnée
ARG POSTGRES_USER=default_us \
	POSTGRES_PASSWORD=default_ps \
	POSTGRES_DB=default_db

ENV POSTGRES_USER=$POSTGRES_USER \
	POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
	POSTGRES_DB=$POSTGRES_DB

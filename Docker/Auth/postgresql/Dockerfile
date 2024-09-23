# Récupération de postgres
FROM postgres:16

# Expositiondu port pour communiquer
EXPOSE 5432

# Récupération des variables pour crée la base de donnée
ARG POSTGRES_USER \
	POSTGRES_PASSWORD \
	POSTGRES_DB \
	LAUNCH

ENV POSTGRES_USER=$POSTGRES_USER \
	POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
	POSTGRES_DB=$POSTGRES_DB \
	LAUNCH=$LAUNCH
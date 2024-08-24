# Ceci fonctionne mais n'est pas optimal car install tout un debian
FROM debian:bullseye-slim

# RUN apt-get install apt-utils -y
RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install -y --no-install-recommends \
	apt-utils \
	sudo \
	postgresql \
	postgresql-contrib

# Définir le chemin pour les binaires PostgreSQL
ENV PATH="/usr/lib/postgresql/13/bin:/usr/lib/postgresql/bin:/usr/local/bin:/usr/bin:/bin"
# ENV PSQL_PWD=123soleil

RUN mkdir -p /var/lib/postgresql/data && \
	chown -R postgres:postgres /var/lib/postgresql
WORKDIR /var/lib/postgresql

COPY conf/init.sh .
RUN chmod +x init.sh

USER postgres
# Ajout du path de l'applis de postgresql au path du conteneur
# ENV PATH="/usr/lib/postgresql/13/bin/:$PATH"

# CMD ["bash", "init.sh"]
ENTRYPOINT ["bash", "init.sh"]

# Celui ci est plus optimal car n'installe que le minimum pour la base de donnée
# Mais je ne sais pas comment faire pour avoir la permission pour créer les
# Répertoire a l'étape 2
# FROM bitnami/postgresql:latest

# RUN mkdir -p var/lib/postgres/data
# WORKDIR var/lib/postgres

# COPY conf/init.sh .
# ENTRYPOINT ["bash", "init.sh"]

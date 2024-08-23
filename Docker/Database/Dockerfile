# Ceci fonctionne mais n'est pas optimal car install tout un debian
FROM debian:bullseye

RUN apt-get update -y && apt-get upgrade -y && apt-get install postgresql -y

RUN mkdir -p var/lib/postgres/data
WORKDIR var/lib/postgres

COPY conf/init.sh .
ENTRYPOINT ["bash", "init.sh"]

# Celui ci est plus optimal car n'installe que le minimum pour la base de donnée
# Mais je ne sais pas comment faire pour avoir la permission pour créer les
# Répertoire a l'étape 2
# FROM bitnami/postgresql:latest

# RUN mkdir -p var/lib/postgres/data
# WORKDIR var/lib/postgres

# COPY conf/init.sh .
# ENTRYPOINT ["bash", "init.sh"]

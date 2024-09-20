# Récupération de postgres
FROM postgres:13

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

# Copie du launch.sh la ou il faut
COPY ./tools/launch.sh $LAUNCH/launch.sh
RUN sed -i 's/\r$//g' $LAUNCH/launch.sh
RUN chmod +x $LAUNCH/launch.sh

ENTRYPOINT ["sh", "-c", "$LAUNCH/launch.sh"]
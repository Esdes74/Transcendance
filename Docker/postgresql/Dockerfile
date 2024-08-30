# Récupération de postgres
FROM postgres:13

# Expositiondu port pour communiquer
# EXPOSE $USER_STATS_DB_PORT

# Récupération des variables pour crée la base de donnée
ARG POSTGRES_USER=default_us \
	POSTGRES_PASSWORD=default_ps \
	POSTGRES_DB=default_db
	# USER=postgres \
	# HOST=localhost \
	# PORT=5432 \
	# DATA=/var/lib/postgresql/data/

ENV POSTGRES_USER=$POSTGRES_USER \
	POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
	POSTGRES_DB=$POSTGRES_DB
	# USER=$USER \
	# HOST=$HOST \
	# PORT=$PORT \
	# DATA=$DATA

# # Initilisation de la base de donnée
# RUN su - "$USER" -c "/usr/lib/postgresql/13/bin/initdb --locale=$LANG -D $DATA"

# # Démarrage de la base de donnée
# RUN su - "$USER" -c "/usr/lib/postgresql/13/bin/pg_ctl -D "$DATA" -l /var/lib/postgresql/logfile start"

# # Création de l'utlisateur de django pour pouvoir utiliser sa base de donnée
# # Le nom d'utilisateur est le meme que le nom de sa base de donnée de base, c'est pourquoi je peux
# # mettre $USER dans -U et -d, si les noms avaient étés différents alors j'aurais du mettre deux variables
# RUN psql -U "$USER" -d "$USER" -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_PASSWORD';"

# # Création de la base de donnée pour l'utiliser depuis django
# RUN psql -h "$HOST" -p "$PORT" -U "$USER" -c "CREATE DATABASE $POSTGRES_DB;"

# # Assure que la base de donnée appartient bien a l'utilisateur django
# RUN psql -U "$USER" -d "$USER" -c "ALTER DATABASE $POSTGRES_DB OWNER TO $POSTGRES_USER;"

# # Accorde les privilèges de connection au nouvel utilisateur
# RUN psql -U "$USER" -d "$USER" -c "GRANT CONNECT ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"

# # Accrode tous les privilieges sur la base de donnée
# RUN psql -U "$USER" -d "$USER" -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"

# # Accorde les privileges d'usage sur le schémas publique de la base de donnée
# RUN psql -U "$USER" -d "$USER" -c "GRANT USAGE ON SCHEMA public TO $POSTGRES_USER;"
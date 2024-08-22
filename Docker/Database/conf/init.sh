#! /bin/sh

# Variable de location de la database
DATA_DIR="/var/lib/postgres/data"

# Variables de création de base de données pour l'utilisation de django
NEW_USER="django_user"

NAME="test_django"
USER="postgres"
PASS="123soleil"
HOST="localhost"
PORT="5432"

# Il est nécessaire d'avoir un utilisateur spécial pour postgre, afin de ne pas pouvoir
# modifier la base de donnée n'importe comment

# Vérifier si l'utilisateur postgres existe
# S'il n'existe pas alors il est créé
if ! (id "$USER" &>/dev/null); then
	echo "création de l'utilsateur $USER"
	sudo useradd -m -s /bin/bash $USER
	sudo passwd $USER
fi

# Vérifier si le répertoire de données existe et s'il contient un fichier `PG_VERSION`
# $DATA_DIR : emplacement des fichiers et répertoires de la base de donnée
if ! ([ -d "$DATA_DIR" ] && [ -f "$DATA_DIR/PG_VERSION" ]); then
    echo "Initialisation de PostgreSQL..."
	# Permet d'initialisier postgresql pour qu'il soit pret a jouer avec des bases de données
	# -i est une option de sudo : permet de réinitialiser l'utilisateur qui va etre utilisé
	# -u permet de passer a un autre utilisateur
	# --> ici "-iu postgres", '-u' permet de passer sur l'utilisateur spéciale pour postgre
	# --> et '-i' permet de le réinitaliser
	# initdb : initialise tous ce qu'il faut pour la base de donnée
	# --locale : définit les parametres regionnaux pour la base de donnée (comment elle réagit a certains trucs)
	# $LANG : variable d'environnement contanant certaines infos pour l'option --locale
	# -D : indique l'emplacement ou doivent etre créés les fichier et dossiers relatif a la database
    sudo -iu $USER initdb --locale $LANG -D $DATA_DIR
fi

# Il n'y a plus qu'a lancer le system :
# Sur manjao c'est sudo systemctl start postgresql
# Mais sur linux classic c'est sudo service start postgresql
sudo systemctl start postgresql

# Création de l'utlisateur de django pour pouvoir utiliser sa base de donnée
# Le nom d'utilisateur est le meme que le nom de sa base de donnée de base, c'est pourquoi je peux
# mettre $USER dans -U et -d, si les noms avaient étés différents alors j'aurais du mettre deux variables
psql -U "$USER" -d "$USER" -c "CREATE USER $NEW_USER WITH PASSWORD '$PASS';"

# Création de la base de donnée pour l'utiliser depuis django
psql -h "$HOST" -p "$PORT" -U "$USER" -c "CREATE DATABASE $NAME;"

# Assure que la base de donnée appartient bien a l'utilisateur django
psql -U "$USER" -d "$USER" -c "ALTER DATABASE $NAME OWNER TO $NEW_USER;"

# Accorde les privilèges de connection au nouvel utilisateur
psql -U "$USER" -d "$USER" -c "GRANT CONNECT ON DATABASE $NAME TO $NEW_USER;"

# Accrode tous les privilieges sur la base de donnée
psql -U "$USER" -d "$USER" -c "GRANT ALL PRIVILEGES ON DATABASE $NAME TO $NEW_USER;"

# Accorde les privileges d'usage sur le schémas publique de la base de donnée
psql -U "$USER" -d "$USER" -c "GRANT USAGE ON SCHEMA public TO $NEW_USER;"

# Actuellement, l'utilisateur django n'a pas les privileges 
# sur les tables, ni sur les sequences
# Il n'a pas non plus les privileges de création sur le schemas public
# (je ne sais pas si ca va manquer)

# Voici les lignes pour les donner
# psql -U "$USER" -d "$USER" -c "GRANT CREATE ON SCHEMA public TO $NEW_USER;"
# psql -U "$USER" -d "$NAME" -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $NEW_USER;"
# psql -U "$USER" -d "$NAME" -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $NEW_USER;"
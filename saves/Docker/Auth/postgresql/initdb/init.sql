-- Activer l'extension dblink pour exécuter des commandes externes
CREATE EXTENSION IF NOT EXISTS dblink;

-- Vérifie si la base de données existe avant de la créer
-- Cette partie doit être placée hors du bloc DO, directement dans le script

-- Création conditionnelle de la base de données
DO
$$
DECLARE
    dbname TEXT := 'authentification_db';
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = dbname
    ) THEN
        PERFORM dblink_exec('dbname=postgres user=' || current_user,
            'CREATE DATABASE ' || quote_ident(dbname));
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Modifier le mot de passe de l'utilisateur postgres
-- ALTER USER postgres WITH PASSWORD '123soleil';

-- Accorder les privilèges sur la base de données
GRANT ALL PRIVILEGES ON DATABASE authentification_db TO postgres;



-- Ceci est pour mettre fin au message d'erreure disant que le role este et la database este
-- Donc si pas besoin a terme car pas ce problème sur pc fac --> a supprimer
CREATE DATABASE este; -- voir si besoin ou pas (a cause du défault de django ?)

CREATE OR REPLACE FUNCTION create_role_if_not_exists() 
RETURNS VOID AS $$
BEGIN
	IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'este') THEN
        CREATE ROLE este WITH LOGIN PASSWORD 'moi123moi';
        ALTER ROLE este CREATEDB; -- Permet de créer des bases de données
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT create_role_if_not_exists();

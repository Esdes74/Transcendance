CREATE DATABASE authentification_db;
CREATE DATABASE este; -- voir si besoin ou pas (a cause du défault de django ?)

CREATE OR REPLACE FUNCTION create_role_if_not_exists() 
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'auth_role') THEN
        CREATE ROLE "auth_role" WITH LOGIN PASSWORD 'auth15sandwich';
        ALTER ROLE "auth_role" CREATEDB; -- Permet de créer des bases de données
		ALTER DATABASE authentification_db OWNER TO "auth_role";
    END IF;
	IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'este') THEN
        CREATE ROLE este WITH LOGIN PASSWORD 'moi123moi';
        ALTER ROLE este CREATEDB; -- Permet de créer des bases de données
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT create_role_if_not_exists();

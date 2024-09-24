CREATE DATABASE psql_DB;
CREATE DATABASE este; -- voir si besoin ou pas (a cause du défault de django ?)

CREATE OR REPLACE FUNCTION create_role_if_not_exists() 
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'psql_user') THEN
        CREATE ROLE psql_user WITH LOGIN PASSWORD '123soleil';
        ALTER ROLE psql_user CREATEDB; -- Permet de créer des bases de données
    END IF;
	IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'este') THEN
        CREATE ROLE este WITH LOGIN PASSWORD 'moi123moi';
        ALTER ROLE este CREATEDB; -- Permet de créer des bases de données
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT create_role_if_not_exists();
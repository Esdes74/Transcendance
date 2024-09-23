CREATE DATABASE este;

CREATE OR REPLACE FUNCTION create_role_if_not_exists() 
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'este') THEN
        CREATE ROLE este WITH LOGIN PASSWORD '123soleil';
        ALTER ROLE este CREATEDB; -- Permet de créer des bases de données
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT create_role_if_not_exists();




-- CREATE OR REPLACE FUNCTION create_role_if_not_exists() 
-- RETURNS VOID AS $$
-- BEGIN
--     IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'este') THEN
--         CREATE ROLE este WITH LOGIN PASSWORD '123soleil';
--         ALTER ROLE este CREATEDB; -- Permet de créer des bases de données
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;

-- SELECT create_role_if_not_exists();
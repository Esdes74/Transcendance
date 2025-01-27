from django.core.management.utils import get_random_secret_key
import os

env_file = '.env'

new_secret_key = get_random_secret_key()

if os.path.exists(env_file):
    with open(env_file, 'r') as file:
        lines = file.readlines()

    with open(env_file, 'w') as file:
        for line in lines:
            if line.startswith('SECRET_KEY'):
                file.write(f"SECRET_KEY='{new_secret_key}'\n")
            else:
                file.write(line)

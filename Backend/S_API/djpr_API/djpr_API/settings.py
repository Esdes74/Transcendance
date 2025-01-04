"""
Django settings for djpr_API project.

Generated by 'django-admin startproject' using Django 4.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import Path
import os
from corsheaders.defaults import default_headers
from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY')
ALGO = os.getenv('ALGO')
FRONT_IP = os.getenv('FRONT_IP')
# print(FRONT_IP)

# Pour vérifier que la clée secrete soit bien définis
if not SECRET_KEY or not ALGO:
	raise ValueError("La clé secrète n'est pas définie dans l'environnement !")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'django-API', FRONT_IP, 'z3r2p3']

# # Paramétrage des CORS policies
# CORS_ALLOWED_ORIGINS = [
# 	"https://localhost:3000",
# 	NGINX_URL,
# ]
# # CORS_ALLOW_ALL_ORIGINS = True

# CORS_ALLOW_HEADERS = list(default_headers) + [
# 	'X-token',
# ]

# CORS_ALLOW_METHODS = [
# 	'GET',
# 	'POST',
# 	'PUT',
# 	'DELETE',
# 	'OPTIONS',
# ]

# # Autoriser l'envoi de cookies avec les requêtes CORS
# CORS_ALLOW_CREDENTIALS = True

# Autorisation CSRF
CSRF_TRUSTED_ORIGINS = [
	"https://localhost:3000",
]
	# NGINX_URL,

CSRF_COOKIE_SECURE = False

# Application definition

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'rest_framework',
	'channels',
	'corsheaders',
	'djap_register',
	'djap_pong',
	'djap_tournament',
]

MIDDLEWARE = [
	# 'djpr_API.mon_middleware.LogRequestURLMiddleware',
	'corsheaders.middleware.CorsMiddleware',
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'djpr_API.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]

CHANNEL_LAYERS = {
	'default': {
		'BACKEND': 'channels.layers.InMemoryChannelLayer',
	},
}

WSGI_APPLICATION = 'djpr_API.wsgi.application'
ASGI_APPLICATION = 'djpr_API.asgi.application'

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
	'default': {
		'ENGINE': os.getenv('SQL_ENGINE'),
		'NAME': os.getenv('SQL_DATABASE_API'),
		'USER': os.getenv('PSQL_USER'),
		'PASSWORD': os.getenv('PSQL_PASS'),
		'PORT': os.getenv('SQL_PORT'),
		'HOST': os.getenv('SQL_HOST_API'),
	}
}

AUTH_USER_MODEL = 'djap_register.UserProfile'

# Paramètres de sécuritée de la base de donnée
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
CSRF_COOKIE_SECURE = True

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

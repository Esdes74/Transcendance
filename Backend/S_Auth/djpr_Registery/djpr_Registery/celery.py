import logging
from celery import Celery
from celery.signals import setup_logging

# Créer l'application Celery
app = Celery('ton_projet')

# Configurer Celery pour utiliser les paramètres de logging par défaut de Django
@setup_logging.connect
def config_loggers(sender=None, **kwargs):
    logging.basicConfig(level=logging.INFO)  # Définit le niveau de log à INFO (ou DEBUG, ERROR, etc.)
    logger = logging.getLogger('celery')  # Obtenir un logger spécifique à Celery
    logger.setLevel(logging.INFO)  # Définir le niveau de log pour Celery

# Ajout de handler pour un fichier de log
file_handler = logging.FileHandler('../../../celery_logs.log')
file_handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

logger = logging.getLogger('celery')
logger.addHandler(file_handler)

# Configuration de Celery
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
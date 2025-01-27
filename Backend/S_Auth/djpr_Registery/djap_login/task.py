# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    task.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/01/24 11:03:18 by eslamber          #+#    #+#              #
#    Updated: 2025/01/27 12:10:06 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# import time
# import logging
# from celery import shared_task
# from datetime import timedelta
# from django.utils.timezone import now
# from .models import FullUser

# # Configuration des logs
# logger = logging.getLogger('celery')

# # La tache peut etre reessayee 7 fois, et elle se lance toutes les 30 secondes
# @shared_task(max_retries=7, default_retry_delay=30)
# def del_temp_acount_task(username):
# 	logger.info("debut tache")
# 	# Recuperation du user
# 	if not username:
# 		return "wrong username"
# 	user = FullUser.objects.filter(username=username).first()

# 	# recuperation de la date et l'heure actuelle
# 	current_time = now()

# 	# Comparer la date de création et l'heure actuelle
# 	logger.info("avant time difference")
# 	time_difference = current_time - user.creation

# 	# Si la différence est supérieure à 3 minutes
# 	logger.info("avant premier if")
# 	if time_difference > timedelta(minutes=3):
# 		logger.info("avant second if")
# 		if user.verified:
# 			return
# 		else:
# 			user.delete()
# 			return
# 	logger.info("fin de la tache")
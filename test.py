
# # ############################################################################################################
# # aff_tournament_bracket.js
# # ############################################################################################################
#
# def startTournament(request):
# 	#from .models import Player
# 	# print("Here we are in startTournament")
# 	if request.method == 'POST':
# 		try:
# 			data = json.loads(request.body)
# 		except json.JSONDecodeError:
# 			return JsonResponse({"error": "Invalid JSON"}, status=400)
# 		rondes = 3
# 		player_list = data.get('player_list')
# 		print("data : ", data)
# 		shuffle_list(player_list)
# 		print("data : ", player_list)
# 		#sauvegardes des joueurs
# 		# player_instance = Player()
# 		# for i in player_list:
# 		# 	player_inst = Player.objects.create(name=player_list[i], winscore=0, game_played=0)
# 		# 	print("player_instance : ", player_inst.name)
# 		# 	player_inst.save()
# 		#afficher dans la console les joueurs sauvegardés\\
# 		# print("player_instance : ", player_list[0])
# 		# player = Player.objects.filter(name=player_list[0])
# 		# print("player : ", player)
# 		# Pairer les joueurs
# 		# pairs = player_list
# 		# print("data : ", pairs)
# 		# pairs = split_into_pairs(pairs)
# 		# print("data : ", pairs)
# 		#return JsonResponse({"pairs": pairs}, status=200)
# 		return JsonResponse({"player_list": data.get('player_list'), "return": "startTournament"}, status=200)
# 	return JsonResponse({"error": "Invalid request method"}, status=405)
#
#
#
#
#
#
#
#
# # ############################################################################################################
# # utils	local
# # ############################################################################################################
#
# def shuffle_list(array):
# 	import random
# 	for i in range(len(array) - 1, 0, -1):
# 		j = random.randint(0, i)
# 		array[i], array[j] = array[j], array[i]
# 	return array
#
# def split_into_pairs(joueurs):
# 	pairs = []
# 	for i in range(0, len(joueurs), 2):
# 		pair = joueurs[i:i + 2]
# 		pairs.append(pair)
# 	return pairs


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import FullUser
from .gen_token import generate_jwt_token
import requests



# # TODO: Passer en GET
@api_view(['POST'])
def login_view(request):
	print("bonjour")
	if (request.method == 'POST') : # TODO: paser en GET
		username = request.data.get('username')
		password = request.data.get('password')

		# Regarde si les identifiants sont donnés/recus
		print(f"username = {username}, et pass = {password}")
		if not username or not password :
			return Response({"error": "Missings credentials"}, status = 400)

		try:
			print("bonjour2")
			# Authentification de l'utilisateurs avec les comptes prééxistans
			user = authenticate(request, username=username, password=password)
			print("bonjour3")

			# Si n'existe pas
			if user is None:
				return Response({"error": "Invalid Credentials"}, status=401)

			# token = generate_jwt_token(user)
			res = "Login Complete with " + username + " and " + password
			print("complete")
			return Response({"message": res}, status = 200)
			# return Response({"message": res, "token": token}, status = 200)
		
		except Exception as e:
			print(f"Error: {str(e)}")
			return Response({"error": "Authentification failed"}, status=500)


@api_view(['POST'])
def create_view(request):
	if (request.method == 'POST') :
		username = request.data.get('username')
		password = request.data.get('password')
		pseudo = request.data.get('pseudo')
		phone_nb = request.data.get('phone_nb')
		mail = request.data.get('mail')
		adress = request.data.get('adress')

		# Regarde si les identifiants sont donnés/recus
		if not username or not password or not pseudo :
			print(f"username = {request.body}, et pass = {password}")
			return Response({"error": "Missings credentials"}, status = 400)

		try:
			# Création du profil
			user = FullUser.objects.create_user(
				username=username,
				password=password,
				pseudo=pseudo,
				phone_nb=phone_nb,
				email=mail,
				adress=adress
			)

			if user:
				# si le user est bien créé avec on créée le token et on renvois tous
				# token = generate_jwt_token(user)
				res = "Login Complete with " + username + " and " + password
				print("suscription complete")
				# return Response({"message": res, "token": token}, status = 201)
				return Response({"message": res}, status = 201)
			else:
				# si le user n'existe pas alors il y a une erreure et on renvois l'erreure
				return Response({"error": "User creation failed"}, status=500)

		except IntegrityError as e:
			# Gérer les erreurs comme la violation de contrainte (doublon sur le nom d'utilisateur)
			return Response({'error': 'Integrity error', 'details': str(e)}, status=400)
		
		except Exception as e:
			# Gérer d'autres types d'erreurs qui pourraient survenir
			return Response({'error': 'An unexpected error occurred', 'details': str(e)}, status=500)
	
	return Response({'error': 'Invalid request method'}, status=405)











# # TODO: Passer en GET
# @api_view(['POST'])
# def login_view(request):
# 	print(f"cookie = {request.COOKIES} et request.META = {request.META.get('HTTP_X_CSRFTOKEN')}") # Ajout pour debuggage
# 	username = request.data.get('username')
# 	password = request.data.get('password')

# 	if not username or not password:
# 		return Response({"error": "Missing credentials"}, status=400)

# 	print("bonjour2") # Ajout pour debuggage
# 	# Appeler un autre service pour gérer l'authentification
# 	external_service_url = "http://django-Auth:8000/auth/login/"
# 	payload = {
# 		'username': username,
# 		'password': password
# 	}

# 	# Ajout d'un header pour le CSRF si nécessaire
# 	# csrf_token = request.META.get('HTTP_X_CSRFTOKEN')
# 	# headers = {
# 	# 	'Content-Type': 'application/x-www-form-urlencoded',
# 	# }

# 	# if csrf_token:
# 	# 	headers['X-CSRFToken'] = csrf_token

# 	# COOKIE=get_cookies_from_request(request)
# 	# COOKIE=request.META.get('HTTP_X_CSRFTOKEN') # plus util sauf pour le debug
	
# 	# Création du token jwt
# 	# tok = RefeshToken.for_user()

# 	try:
# 		print("bonjour3") # Ajout pour debuggage
# 		print(f"Sending request to {external_service_url} with payload {payload}")# and cookie {COOKIE}")
# 		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)
# 		# Vérifier si la requête a réussi
# 		if response.status_code == 200:
# 			return Response(response.json(), status=200) # TODO: retourner le token renvoyé en cas de bonne réponse
# 		else:
# 			print("bonjour4") # Ajout pour debuggage
# 			print(response.text) # Ajout pour debuggage
# 			res = "Login failed\n" + response.text
# 			return Response({"error": res}, status=response.status_code)

# 	except requests.exceptions.RequestException as e:
# 		print("bonjour5") # Ajout pour debuggage
# 		return Response({"error": str(e)}, status=500)

# @api_view(['POST'])
# def create_view(request):
# 	username = request.data.get('username')
# 	password = request.data.get('password')
# 	pseudo = request.data.get('pseudo')
# 	phone_nb = request.data.get('phone_nb')
# 	mail = request.data.get('mail')
# 	adress = request.data.get('adress')

# 	# Si je n'ai pas les champs obligatoires
# 	if not username or not password or not pseudo:
# 		return Response({"error": "Missing credentials"}, status=400)

# 	# Appeler un autre service pour gérer l'authentification
# 	external_service_url = "http://django-Auth:8000/auth/create/"
# 	payload = {
# 		'username': username,
# 		'password': password,
# 		'pseudo': pseudo,
# 		'phone_nb': phone_nb,
# 		'mail': mail,
# 		'adress': adress
# 	}

# 	try:
# 		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

# 		if response.status_code == 201:
# 			return Response(response.json(), status=201) # TODO: retourner le token renvoyé en cas de bonne réponse
# 		else:
# 			res = "Login failed\n" + response.text
# 			return Response({"error": res}, status=response.status_code)

# 	except requests.exceptions.RequestException as e:
# 		return Response({"error": str(e)}, status=500)
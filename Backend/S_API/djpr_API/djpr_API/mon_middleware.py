# class LogRequestURLMiddleware:
# 	def __init__(self, get_response):
# 		self.get_response = get_response

# 	def __call__(self, request):
# 		# Log l'URL de la requête
# 		print(f"URL de la requête : {request.build_absolute_uri()}")

# 		# Log des informations CORS si elles sont présentes dans la requête
# 		origin = request.META.get('HTTP_ORIGIN', None)
# 		cors_method = request.META.get('HTTP_ACCESS_CONTROL_REQUEST_METHOD', None)
# 		cors_headers = request.META.get('HTTP_ACCESS_CONTROL_REQUEST_HEADERS', None)

# 		if origin:
# 			print(f"Origine de la requête CORS : {origin}")
# 		if cors_method:
# 			print(f"Méthode de la requête CORS : {cors_method}")
# 		if cors_headers:
# 			print(f"En-têtes CORS demandés : {cors_headers}")

# 		# Passer au middleware ou à la vue suivante
# 		response = self.get_response(request)
# 		return response

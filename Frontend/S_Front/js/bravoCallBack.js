function loadBravoCallBack()
{
	const params = new URLSearchParams(window.location.search);
	const code = params.get('code');

	if (code) {
		console.log("Code reçu :", code);
		// Envoyez le code à votre backend pour échanger contre un token d'accès
	} else {
		console.error("Code non trouvé dans l'URL");
	}
}
loadBravoCallBack()
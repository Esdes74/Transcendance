async function loadBravoCallBack()
{
	const params = new URLSearchParams(window.location.search);
	const code = params.get('code');
	const state = params.get('state');

	if (code && state) {
		const data = {
			sendState: state,
			sendCode: code
		};

		try {
			// Envoie les données à l'API
			const response = await fetch('api/remote_oauth/make_token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			});

			// Vérifie la réponse de l'API
			if (response.ok) {
				const result = await response.json();
				console.log('Réponse de l\'API :', result.message);

			} else {
				// Affiche un message d'erreur si la connexion échoue
				const error = await response.json();
				console.error('Erreur :', error);
				alert('Échec de la connexion : ' + JSON.stringify(error));
			}
		} catch (error) {
			console.error('Erreur lors de la connexion :', error);
			alert('Une erreur est survenue. Veuillez réessayer.');
		}
	} else {
		console.error("Code non trouvé dans l'URL");
	}
}
loadBravoCallBack()
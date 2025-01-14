async function loadRegisterToFT()
{
	state = generateRandomString(50);

	const data = {
		sendState: state
	};

	try {
		// Envoie les données à l'API
		const response = await fetch('api/remote_oauth/forty_two_auth/', {
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
			console.log('Réponse de l\'API :', result.uri);

			// uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;
			window.location.assign(result.uri);
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
}

function generateRandomString(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}

//loadRegisterToFT()

// Keep this just in case
// uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

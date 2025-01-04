async function loadRegisterToFT()
{
	base = "https://api.intra.42.fr/oauth/authorize"
	client_id = "u-s4t2ud-2855f64662c5d9e90d45b597665108079599a5f97fe6ea1a5d74a64c510f67ff";
	redirect_uri = encodeURIComponent("https://z3r2p3:3000/bravocallback");
	response_type = "code";
	scope = "public";
	state = generateRandomString(50);

	const data = {
		sendState: state
	};

	try {
		// Envoie les données à l'API
		const response = await fetch('api/remote_oauth/stock/', {
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
			console.log('Réponse de l\'API :', result);

			uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;
			window.location.assign(uri);
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

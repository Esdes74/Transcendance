function loadLogin()
{
		const form = document.getElementById('loginForm');

		form.addEventListener('submit', async (event) => {
		event.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle

		// Récupère les données du formulaire
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		// Crée l'objet pour les données du formulaire
		const data = {
			username: username,
			password: password
		};

		try {
			// Envoie les données à l'API
			const response = await fetch('/api/auth/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			});

			// Vérifie la réponse de l'API
			if (response.ok) { // TODO: Gérer la éception des cookies 
				const result = await response.json();
				console.log('Réponse de l\'API :', result.message);

				// Redirige vers une autre page ou affiche un message de succès
				if (result['2fa'])
					updatePage("2fa");
				else
					updatePage("bravo");
				// window.location.href = '/2fa.html'; // Remplace par l'URL de redirection souhaitée
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
	});
}

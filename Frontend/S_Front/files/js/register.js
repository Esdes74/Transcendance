document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('loginForm');

	form.addEventListener('submit', async (event) => {
		event.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle

		// Récupère les données du formulaire
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const confirmed_password = document.getElementById('confirmed-password').value;
		const pseudo = document.getElementById('pseudo').value;
		const mail = document.getElementById('mail').value;
		const phone_nb = document.getElementById('phone_nb').value;

		// Vérification si le mdp est bien confirmé
		if (password != confirmed_password)
		{
			alert('Password not confirmed');
			return ;
		}

		// Crée l'objet pour les données du formulaire
		const data = {
			username: username,
			password: password,
			pseudo: pseudo,
			mail: mail,
			phone_nb: phone_nb,
		};

		try {
			// Envois des donées en log pour le debuggage
			// Envoie les données à l'API
			const response = await fetch('http://localhost:8000/api/auth/create/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			});

			// Vérifie la réponse de l'API
			if (response.ok) { // TODO: Gérer la réception des cookies 
				const result = await response.json();
				console.log('Réponse de l\'API :', result);

				// Sauvegarde le token ou redirige l'utilisateur
				// response.set_cookie(key='jwt_token', value=token)//, httponly=True, secure=True)  // secure=True pour HTTPS

				// Redirige vers une autre page ou affiche un message de succès
				window.location.href = '/2fa.html'; // Remplace par l'URL de redirection souhaitée
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
});
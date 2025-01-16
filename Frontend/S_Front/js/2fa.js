function load2faLogin()
{
	const form = document.getElementById('loginForm');
	form.addEventListener('submit', async (event) => {
		Array.from(form.elements).forEach(element => {
			element.disabled = true;
                })
		event.preventDefault(); // Empêche le formulaire de se soumettre de manière traditionnelle

		// Récupère les données du formulaire
		const password = document.getElementById('password').value;

		// Crée l'objet pour les données du formulaire
		const data = {
			password: password
		};

		try {
			// Envoie les données à l'API
			const response = await fetch('/api/auth/2fa/', {
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
				changeHeader()
				updatePage("")
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
		Array.from(form.elements).forEach(element => {
			element.disabled = false;
                })
	});
}

// try {
// 	// Envoie les données à l'API
// 	// Ici pas besoin d'envoyer de données puisque la requete ne'a besoin que du token de 2fa
// 	const response = await fetch('/api/auth/refresh_2fa/', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		credentials: 'include'
// 	});

// 	// Vérifie la réponse de l'API
// 	// La requete renvois un nouveau token et renvois un mdp au client par mail
// 	// si c'est tous bon tu recois un code 200
// 	// Si il n'y a plus le token 2fa (que l'utilisateur a dépassé le temps pour rentrer son premier mdp)
// 	// --> ca renvois un unauthorized comme d'hab avec les problèmes pck le token n'est plus dispo
// 	// On m'a dis que les erreures 400 et quelques c'est pas grave pck c'est des erreures renvoyé par notre code donc ca passe
// 	if (response.ok) { // TODO: Gérer la éception des cookies 
// 		const result = await response.json();
// 		console.log('Réponse de l\'API :', result.message);
// 		// changeHeader()	--> Je ne sais pas s'il faut laisser ou non je te laisse décider
// 		// updatePage("")	--> Je ne sais pas s'il faut laisser ou non je te laisse décider
// 	} else {
// 		// Affiche un message d'erreur si la connexion échoue
// 		const error = await response.json();
// 		console.error('Erreur :', error);
// 		alert('Échec de la connexion : ' + JSON.stringify(error));
// 	}
// } catch (error) {
// 	console.error('Erreur lors de la connexion :', error);
// 	alert('Une erreur est survenue. Veuillez réessayer.');
// }	
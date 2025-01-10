// async function loadBravoFnct()
// {
// 	// Crée l'objet pour les données du formulaire
// 	// const data = {
// 	// 	new2fa: false,
// 	// };

// 	try {
// 		// Envoie les données à l'API
// 		const response = await fetch('/api/auth/get_lang/', {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			credentials: 'include'
// 		});
// 		// body: JSON.stringify(data),

// 		// Vérifie la réponse de l'API
// 		if (response.ok) { // TODO: Gérer la éception des cookies 
// 			const result = await response.json();
// 			console.log('Réponse de l\'API :', result.message);
// 		} else {
// 			// Affiche un message d'erreur si la connexion échoue
// 			const error = await response.json();
// 			console.error('Erreur :', error);
// 			alert('Échec de la connexion : ' + JSON.stringify(error));
// 		}
// 	} catch (error) {
// 		console.error('Erreur lors de la connexion :', error);
// 		alert('Une erreur est survenue. Veuillez réessayer.');
// 	}
// }
// loadBravoFnct()

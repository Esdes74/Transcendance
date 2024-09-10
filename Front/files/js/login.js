function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener('DOMContentLoaded', () => {
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

		cookie = getCookie('csrftoken');

        try {
			// envois des donées en log pour le debuggage
			console.log(cookie);
			// Envoie les données à l'API
			const response = await fetch('http://localhost:8000/api/auth/login/', {
				method: 'POST',
                headers: {
					'Content-Type': 'application/json',
					'X-CSRFToken': cookie
                },
				credentials: 'include',
                body: JSON.stringify(data)
            });
			
            // Vérifie la réponse de l'API
            if (response.ok) {
                const result = await response.json();
                console.log('Réponse de l\'API :', result);
                
                // Sauvegarde le token ou redirige l'utilisateur
                localStorage.setItem('token', result.token); // Sauvegarde le token dans le stockage local

                // Redirige vers une autre page ou affiche un message de succès
                window.location.href = '/some-other-page.html'; // Remplace par l'URL de redirection souhaitée
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
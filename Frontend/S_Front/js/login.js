function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

function loadLogin()
{
	const form = document.getElementById('loginForm');
	form.addEventListener('submit', async (event) => {
		Array.from(form.elements).forEach(element => {
			element.disabled = true;
		})
		event.preventDefault();
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const data = {
			username: username,
			password: password
		};

		// Création du header Authorization avec Basic Auth
		const credentials = btoa(`${username}:${password}`);
		const csrfToken = getCookie('csrftoken');

		try {
			const response = await fetch('/api/auth/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${credentials}`,
					'X-CSRFToken': csrfToken,
				},
				credentials: 'include',
				body: JSON.stringify({rien:''}),
			});
			if (response.ok) {
				const result = await response.json();
				if (result['2fa'])
					updatePage("2fa");
				else
					updatePage("");
			} else if (response.status >= 500 && response.status < 600)
				updatePage("50X")
			else if (response.status == 403)
				await affLoginMessage("Connection Refusée")
			else
			{
				const result = await response.json();
				if (result["error"] === "Unauthorized")
				{
					history.replaceState({pageID: 'duplicate'}, '', "/duplicate")
					changeHeader()
					rootMyUrl(true)
				}
				else
					await affLoginMessage("Identifiant ou mot de passe invalide")
			}
		} catch (error) {
			updatePage("50X");
		}
		Array.from(form.elements).forEach(element => {
			element.disabled = false;
                })
	});
}

async function affLoginMessage(message)
{
	myMessage = document.getElementById('error-message')
	myMessage.style.display="block"
	myMessage.innerText = message
	myMessage.className="rounded-pill p-2 mt-2 mb-0 fw-bold"
	myMessage.style.backgroundColor = "lightcoral"
	tradElements([myMessage])
	await new Promise(r => setTimeout(r, 3000))
	myMessage.style.display="none"
}

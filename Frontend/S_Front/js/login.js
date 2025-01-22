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
		try {
			const response = await fetch('/api/auth/login/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			});
			if (response.ok) {
				const result = await response.json();
				if (result['2fa'])
					updatePage("2fa");
				else
					updatePage("");
			} else if (response.status >= 500 && response.status < 600)
				updatePage("50X")
			else
			{
				const error = await response.json();
				if (error["detail"] === "Unauthorized")
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

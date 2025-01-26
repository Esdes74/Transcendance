function load2faLogin()
{
	const form = document.getElementById('loginForm');
	form.addEventListener('submit', async (event) => {
		Array.from(form.elements).forEach(element => {
			element.disabled = true;
                })
		event.preventDefault();
		const password = document.getElementById('password').value;
		const data = {
			password: password
		};
		try {
			const response = await fetch('/api/auth/2fa/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			});
			if (response.ok)
				updatePage("")
			else if (response.status >= 500 && response.status < 600)
				updatePage("50X")
			else if (response.status == 403)
				await affMessage("Connection Refusée", true)
			else {
				await affMessage("Code Invalide !", true)
			}
		} catch (error) {
		}
		Array.from(form.elements).forEach(element => {
			element.disabled = false;
                })
	});
	document.getElementById('send-again').addEventListener('click', async function () {
	document.getElementById('send-again').style.pointerEvents = 'none'
	try {
		const response = await fetch('/api/auth/refresh_2fa/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		});
		if (response.status >= 500 && response.status < 600)
			updatePage("50X")
		else if (response.status == 403)
			await affMessage("Connection Refusée", true)
		else if (!response.ok)
		{
			await affMessage("Erreur, essayez de vous reconnecter", true)
		}
		else
			await affMessage("Mail Réenvoyé !", false)
		document.getElementById('send-again').style.pointerEvents = 'auto'
	}
	catch (error) {
		updatePage("50X")
	}
	})
}

async function affMessage(message, isError)
{
	myMessage = document.getElementById('error-message')
	myMessage.innerText = message
	tradElements([myMessage]) 
	myMessage.style.padding = '4px'
	myMessage.classList.remove('bg-danger')
	myMessage.classList.remove('bg-success')
	if (isError)
		myMessage.classList.add('bg-danger');
	else
		myMessage.classList.add('bg-success');
	await new Promise(r => setTimeout(r, 3000))
	myMessage.innerText = ""
	myMessage.style.padding = '0px'
}

function loadRegister()
{
	const form = document.getElementById('loginForm');

	form.addEventListener('submit', async (event) => {
		Array.from(form.elements).forEach(element => {
      			element.disabled = true;
		})
		event.preventDefault();
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const confirmed_password = document.getElementById('confirmed-password').value;
		const mail = document.getElementById('mail').value;
		const data = {
			username: username,
			password: password,
			confirmed: confirmed_password,
			mail: mail,
		};
		try {
			const response = await fetch('/api/auth/create/', {
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

			else {
				const error = await response.json();
				if (error["detail"] === "Unauthorized")
				{
					history.replaceState({pageID: 'duplicate'}, '', "duplicate")
					changeHeader()
					rootMyUrl(true)
				}
				else
					await affRegisterMessage("ISSUE HERE")
			}
		} catch (error) {
			updatePage("50X")
		}
		 Array.from(form.elements).forEach(element => {
                        element.disabled = false;
               })
	});
}

async function affRegisterMessage(message)
{
	myMessage = document.getElementById('error-message')
	myMessage.innerText = message
	tradElements([myMessage])
	myMessage.style.padding = '4px'
	await new Promise(r => setTimeout(r, 3000))
	myMessage.innerText = ""
	myMessage.style.padding = '0px'
}

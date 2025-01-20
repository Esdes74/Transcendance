async function loadRegisterToFT()
{
	state = generateRandomString(50);

	const data = {
		sendState: state
	};

	try {
		const response = await fetch('api/remote_oauth/forty_two_auth/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
		if (response.ok) {
			const result = await response.json();
			window.location.assign(result.uri);
		} else if (response.status >= 500 && response.status < 600)
			updatePage("50X")
		else
		{
			history.replaceState({pageID: 'duplicate'}, '', "/duplicate")
			changeHeader()
			rootMyUrl(true)
		}
	} catch (error) {
		updatePage("50X")
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
// Keep this just in case
// uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

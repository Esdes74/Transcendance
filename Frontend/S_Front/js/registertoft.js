function loadRegisterToFT()
{
	base = "https://api.intra.42.fr/oauth/authorize"
	client_id = import.meta.env.UID;//"u-s4t2ud-2855f64662c5d9e90d45b597665108079599a5f97fe6ea1a5d74a64c510f67ff";
	redirect_uri = encodeURIComponent("https://localhost:3000/bravocallback");
	response_type = "code";
	scope = "public";
	state = generateRandomString(50);
	uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}&state=${state}`;
	window.location.assign(uri);
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

loadRegisterToFT()

// Keep this just in case
// uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
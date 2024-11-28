function loadRegisterToFT()
{
	base = "https://api.intra.42.fr/oauth/authorize"
	client_id = "u-s4t2ud-2855f64662c5d9e90d45b597665108079599a5f97fe6ea1a5d74a64c510f67ff";
	redirect_uri = encodeURIComponent("https://localhost:3000/bravo");
	response_type = "code"
	uri = `https://api.intra.42.fr/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
	window.location.assign(uri);
}
loadRegisterToFT()

// Keep this just in case
// scope = "public"
// state = "a_very_long_random_string_witchmust_be_unguessable'"
// uri = `https://api.intra.42.fr/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}`;
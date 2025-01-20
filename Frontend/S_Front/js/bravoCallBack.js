async function loadBravoCallBack()
{
	const params = new URLSearchParams(window.location.search);
	const code = params.get('code');
	const state = params.get('state');

	if (code && state) {
		const data = {
			sendState: state,
			sendCode: code
		};
		try {
			const response = await fetch('api/remote_oauth/make_token/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include'
			});
			if (response.ok) {
				updatePage("")
			} else if (response.status >= 500 && response.status < 600){
				updatePage("50X")
			}
		} catch (error) {
			updatePage("50X")
		}
	}
}

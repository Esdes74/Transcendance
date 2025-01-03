function loadPlayOptions()
{
	const cards = document.querySelectorAll('.card')
	cards.forEach(card => {
		card.addEventListener('click', function()
		{
			const link = card.getAttribute('link')
			console.log("link : ", link);
			history.pushState({pageID: link}, '', "/" + link)
			rootMyUrl()
		})
	})
}

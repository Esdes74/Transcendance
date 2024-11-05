function updateButton()
{
    history.pushState({pageID: 'index'}, 'Index', '/')
    rootMyUrl()
}

function updateSecondButton()
{
    history.pushState({pageID: 'authentification'}, 'authentification', '/authentification')
    rootMyUrl()
}

function updateThirdButton()
{
    history.pushState({pageID: 'bravo'}, 'bravo', '/bravo')
    rootMyUrl()
}

function updateFourthButton()
{
    history.pushState({pageID: 'Pong'}, 'Pong', '/pong')
    rootMyUrl()
}

function getLinks()
{
    let buttons = document.querySelectorAll("button")
    buttons.forEach( button => {
    if (button.value === "Accueil")
        button.addEventListener("click", updateButton)
    else if (button.value === "Connexion")
        button.addEventListener("click", updateSecondButton)
    else if (button.value === "Play")
        button.addEventListener("click", updateFourthButton)
    else
        button.addEventListener("click", updateThirdButton)
})
}

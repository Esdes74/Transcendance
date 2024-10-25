function updateButton()
{
    console.log("caca")
    history.pushState({pageID: 'prouteur'}, 'Coucou le caca', '/prout.html')
    rootMyUrl()
}

function updateSecondButton()
{
    console.log("pipi")
    history.pushState({pageID: 'secondButton'}, 'Cca', '/therapie.html')
    rootMyUrl()
}

function getButton()
{
    let buttons = document.querySelectorAll("input")
    buttons.forEach( button => {
    if (button.value === "Accueil")
        button.addEventListener("click", updateButton)
    else
        button.addEventListener("click", updateSecondButton)
})
}
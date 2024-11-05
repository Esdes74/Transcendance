function removeScripts()
{
    let scripts = document.querySelectorAll("script")
    scripts.forEach( script => {
    script.parentNode.removeChild(script)
})
}

function rootMyUrl()
{
    removeScripts()
    loc = window.location.pathname
    if (loc === "/index.html" || loc === "/index" || loc === "/")
    {
        let scriptElement = document.createElement('script')
        scriptElement.setAttribute("src", "js/aff_index.js")
        document.head.appendChild(scriptElement)
        scriptElement.onload = function()
        {
            affIndex()
        }
    }
    else if (loc === "/bravo.html" || loc === "/bravo")
    {
        let scriptElement = document.createElement('script')
        scriptElement.setAttribute("src", "js/aff_bravo.js")
        document.head.appendChild(scriptElement)
        scriptElement.onload = function()
        {
            affBravo()
        }
    }
    else if (loc === "/authentification.html" || loc === "/authentification")
    {
        let scriptElement = document.createElement('script')
        scriptElement.setAttribute("src", "js/aff_authentification.js")
        document.head.appendChild(scriptElement)
        scriptElement.onload = function()
        {
            affAuthentification()
        }
    }
    else if (loc === "/register.html" || loc === "/register")
    {
        let scriptElement = document.createElement('script')
        scriptElement.setAttribute("src", "js/aff_register.js")
        document.head.appendChild(scriptElement)
        scriptElement.onload = function()
        {
            affRegister()
        }
    }
    else if (loc === "/pong.html" || loc === "/pong")
    {
        let scriptElement = document.createElement('script')
        scriptElement.setAttribute("src", "js/aff_pong.js")
        document.head.appendChild(scriptElement)
        scriptElement.onload = function()
        {
            affPong()
        }
    }
}

rootMyUrl()
window.addEventListener('popstate', function (event)
{
    rootMyUrl()
}
)
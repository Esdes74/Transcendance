function aff404()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
    <div> A FAIRE</div>
    `
}

pages["/404"].funct = aff404
aff404()

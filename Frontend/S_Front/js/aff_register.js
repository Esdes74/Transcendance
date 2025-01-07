function registerCallback()
{
	loadRegister()
}

function registerAnimationCallback()
{
	canvas = document.getElementById("loginCanvas")
	loadAnimationLogin(canvas)
}

function affRegister()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
    <div class="container text-center my-5">
        <div class="row justify-content-center">
		<div class="col-md-8">
			<h1 class="mb-5 fw-bold" data-translate="true">Creation de compte</h1>
			<div class="canvas-container">
			<canvas id="loginCanvas" class="w-100" height="400"></canvas>
			<div class="replayBlock">	
        			<form id="loginForm">
        			    <div class="form-group">
                			<label for="username">Nom d'utilisateur</label>
                				<input type="text" class="form-control" id="username" placeholder="Entrez votre nom d'utilisateur" required>
      				    </div>
            		<div class="form-group">
             			<label for="password">Mot de passe</label>
					<input type="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" autocomplete="defaultpswd" required>
            		</div>
            		<div class="form-group">
             			<label for="confirmed-password">Confirmation mot de passe</label>
              				<input type="password" class="form-control" id="confirmed-password" placeholder="Confirmez votre mot de passe" autocomplete="defaultpswd" required>
            		</div>
            		<div class="form-group">
            			<label for="mail">E-Mail</label>
          			<input type="email" class="form-control" id="mail" placeholder="Entrez votre e-mail" required>
            		</div>
            <button type="submit" class="btn btn-primary mt-2">rregister</button>
        </form>
        <!--div id="error-message" class="mt-3 text-danger"></div-->
    </div>
    `
	addScript("/js/register.js", registerCallback)
	addScript("/js/loginPong.js", registerAnimationCallback)
	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	forms = document.querySelectorAll('input')
	setFormsAlert(forms)
	tradNewPage()
}

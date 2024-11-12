function affPong()
{
    let docMain = document.querySelector('main')
   	docMain.innerHTML = `
    <div class="container text-center my-5">
		<div class="row justify-content-center">
			<canvas id="offlineCanvas" width="1200" height="800">
			</canvas>
		</div>
    </div>
    `
    if (!addScript("js/init_offline_pong.js"))
	initOfflinePong()
}

pages["/pong"].funct = affPong
affPong()

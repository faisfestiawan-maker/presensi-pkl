let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    const btn = document.getElementById("btnInstall");

    if(btn){
        btn.style.display = "block";
    }

});

async function installApp(){

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    const result = await deferredPrompt.userChoice;

    console.log(result.outcome);

    deferredPrompt = null;

    const btn = document.getElementById("btnInstall");

    if(btn){
        btn.style.display="none";
    }

}

window.installApp = installApp;

window.addEventListener("appinstalled", ()=>{

    const btn=document.getElementById("btnInstall");

    if(btn){

        btn.style.display="none";

    }

});
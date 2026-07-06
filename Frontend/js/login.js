const txtNIS=document.getElementById("nis");

const btnLogin=document.getElementById("btnLogin");

const info=document.getElementById("info");



btnLogin.onclick=async()=>{

    const nis=txtNIS.value.trim();

    if(nis==""){

        info.innerHTML="Masukkan NIS";

        return;

    }

    info.innerHTML="Login...";

    try{

        const hasil=await API.login(nis);

        if(hasil.success){

            Storage.save(hasil.data);

            info.innerHTML="Login berhasil";

            location.href="dashboard.html";

        }

        else{

            info.innerHTML=hasil.message;

        }

    }

    catch(err){

        info.innerHTML="Tidak dapat terhubung ke server";

        console.log(err);

    }

}
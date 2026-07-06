const siswa=Storage.get();

if(!siswa){

    location.href="index.html";

}

document.getElementById("nama").innerHTML="Nama : "+siswa.nama;

document.getElementById("nis").innerHTML="NIS : "+siswa.nis;

document.getElementById("kelas").innerHTML="Kelas : "+siswa.kelas;

document.getElementById("tempat").innerHTML="Tempat PKL : "+siswa.tempat;



document.getElementById("logout").onclick=()=>{

    Storage.clear();

    location.href="index.html";

}

const foto = document.getElementById("foto");
const preview = document.getElementById("preview");
const statusUpload = document.getElementById("statusUpload");

foto.onchange = async () => {

    const file = foto.files[0];

    if(!file) return;

    if(!file.type.startsWith("image/")){

        alert("File harus berupa gambar.");

        foto.value="";

        return;

    }

    statusUpload.innerHTML="Mengoptimalkan foto...";

    try{

        const blob = await ImageCompressor.compress(file);

        window.fotoUpload = blob;

        preview.src = URL.createObjectURL(blob);
        preview.style.display = "block";

        statusUpload.innerHTML =
            "✅ Foto siap diupload ("+
            Math.round(blob.size/1024)+
            " KB)";

    }catch(e){

        alert("Foto gagal diproses.");

        foto.value="";

        statusUpload.innerHTML="";

    }

};

function toBase64(file){

    return new Promise((resolve)=>{

        const reader=new FileReader();

        reader.onload=()=>{

            resolve(

                reader.result.split(",")[1]

            );

        };

        reader.readAsDataURL(file);

    });

}

document.getElementById("btnUpload").onclick = async () => {

    if (!cekInternet()) {
        alert("Tidak ada koneksi internet.");
        return;
    }

    const file = window.fotoUpload;

    if (!file) {
        alert("Pilih foto.");
        return;
    }

    const btnUpload = document.getElementById("btnUpload");
    const progress = document.getElementById("progress");

    btnUpload.disabled = true;
    progress.style.display = "block";
    progress.value = 10;

    statusUpload.innerHTML = "Menyiapkan upload...";

    const base64 = await toBase64(file);

    progress.value = 70;

    const data = {

        action: "upload",

        nis: siswa.nis,

        nama: siswa.nama,

        kelas: siswa.kelas,

        tempat: siswa.tempat,

        mimeType: file.type,

        base64: base64

    };

    try {

        statusUpload.innerHTML = "Mengupload ke server...";

        const hasil = await API.upload(data);

        progress.value = 100;

        if (hasil.success) {

            statusUpload.innerHTML = "✅ Upload berhasil";

            alert("Upload berhasil.");

        } else {

            statusUpload.innerHTML = "❌ " + hasil.message;

        }

    } catch (err) {

        console.error(err);

        statusUpload.innerHTML = "❌ Upload gagal";

    }

    btnUpload.disabled = false;

}

async function loadStatus(){

    const hasil=

    await API.cek(

        siswa.nis

    );

    const statusEl=document.getElementById("statusHari");
    const btnUpload=document.getElementById("btnUpload");

    if(!statusEl){
        return;
    }

    if(hasil && hasil.sudah){

        statusEl.innerHTML=

        "✅ Sudah presensi pukul "+hasil.jam;

        if(btnUpload){
            btnUpload.disabled=true;
        }

    }
    else if(hasil && hasil.success === false){

        statusEl.innerHTML=

        "⚠️ Gagal memuat status presensi.<br>"+hasil.message;

        if(btnUpload){
            btnUpload.disabled=false;
        }

    }
    else{

        statusEl.innerHTML=

        "❌ Belum presensi";

    }

}

async function loadRiwayat(){

    const hasil=

    await API.riwayat(

        siswa.nis

    );

    const riwayatEl=document.getElementById("riwayat");

    if(!riwayatEl){
        return;
    }

    if(!hasil || !Array.isArray(hasil.data)){
        riwayatEl.innerHTML="<div>Gagal memuat riwayat presensi.</div>";
        return;
    }

    if(hasil.data.length===0){
        riwayatEl.innerHTML="<div>Belum ada riwayat presensi.</div>";
        return;
    }

    let html="";

    hasil.data.forEach(item=>{

        html+=`

        <div>

        ${item.tanggal}

        ${item.jam}

        </div>

        `;

    });

    riwayatEl.innerHTML=html;

}

loadStatus();

loadRiwayat();
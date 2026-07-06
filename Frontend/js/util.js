function cekInternet(){

    return navigator.onLine;

}

window.addEventListener("online",()=>{

    document
    .getElementById("statusUpload")
    .innerHTML="🟢 Online";

});

window.addEventListener("offline",()=>{

    document
    .getElementById("statusUpload")
    .innerHTML="🔴 Tidak ada internet";

});

async function compressImage(file){

    return new Promise(resolve=>{

        const reader=new FileReader();

        reader.onload=function(e){

            const img=new Image();

            img.onload=function(){

                const canvas=document.createElement("canvas");

                const MAX=1280;

                let w=img.width;

                let h=img.height;

                if(w>h){

                    if(w>MAX){

                        h*=MAX/w;

                        w=MAX;

                    }

                }else{

                    if(h>MAX){

                        w*=MAX/h;

                        h=MAX;

                    }

                }

                canvas.width=w;

                canvas.height=h;

                canvas
                .getContext("2d")
                .drawImage(img,0,0,w,h);

                canvas.toBlob(resolve,"image/jpeg",0.8);

            }

            img.src=e.target.result;

        }

        reader.readAsDataURL(file);

    });

}
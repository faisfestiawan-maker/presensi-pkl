class ImageCompressor {

    static compress(file){

        return new Promise((resolve,reject)=>{

            const reader=new FileReader();

            reader.onload=e=>{

                const img=new Image();

                img.onload=()=>{

                    const canvas=document.createElement("canvas");
                    const ctx=canvas.getContext("2d");

                    let width=img.width;
                    let height=img.height;

                    const MAX_WIDTH=1280;
                    const MAX_HEIGHT=1280;

                    if(width>height){

                        if(width>MAX_WIDTH){
                            height*=MAX_WIDTH/width;
                            width=MAX_WIDTH;
                        }

                    }else{

                        if(height>MAX_HEIGHT){
                            width*=MAX_HEIGHT/height;
                            height=MAX_HEIGHT;
                        }

                    }

                    canvas.width=width;
                    canvas.height=height;

                    ctx.drawImage(img,0,0,width,height);

                    let quality=0.8;

                    function exportImage(){

                        canvas.toBlob(blob=>{

                            if(blob.size>700*1024 && quality>0.35){

                                quality-=0.1;

                                exportImage();

                                return;

                            }

                            resolve(blob);

                        },"image/jpeg",quality);

                    }

                    exportImage();

                };

                img.onerror=reject;

                img.src=e.target.result;

            };

            reader.onerror=reject;

            reader.readAsDataURL(file);

        });

    }

}
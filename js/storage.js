const Storage = {

save(data){

localStorage.setItem(

"siswa",

JSON.stringify(data)

);

},

get(){

return JSON.parse(

localStorage.getItem("siswa")

);

},

clear(){

localStorage.removeItem("siswa");

}

};
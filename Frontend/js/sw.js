const CACHE = "presensi-pkl-v1";

const FILES = [

    "./",

    "./index.html",

    "./dashboard.html",

    "./manifest.json",

    "./offline.html",

    "./css/style.css",

    "./css/dashboard.css",

    "./js/config.js",

    "./js/api.js",

    "./js/dashboard.js",

    "./js/login.js",

    "./js/image-compressor.js",

    "./img/logo.png",

    "./img/icon-192.png",

    "./img/icon-512.png"

];

self.addEventListener("install",(event)=>{

    self.skipWaiting();

});

self.addEventListener("fetch",event=>{

    event.respondWith(

        fetch(event.request)

        .catch(()=>caches.match(event.request))

    );

});

self.addEventListener("activate",(event)=>{

    event.waitUntil(

        clients.claim()

    );

});
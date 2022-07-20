const APP_PREFIX = 'Budget_Tracker-';
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./js/idb.js",
    "./js/index.js",
    "./css/styles.css",
    "./manifest.json"
];


self.addEventListener('install', function (e){
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>{
            console.log('Server Worker installed, data was cached succesfully');
            return cache.addAll(FILES_TO_CACHE);
        })
    )
})

self.addEventListener('fetch', function (e){
    console.log('fetch request : ' + e.request.url)
    e.respondWith(

    )
})
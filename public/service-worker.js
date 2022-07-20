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
        caches.keys().then(function(keyList){
            let cacheKeepList = keyList.filter(function(key){
                return key.indexOf(APP_PREFIX);
            });
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i){
                    if (cacheKeepList.indexOf(key) === -1){
                        console.log('delete cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            )
        })
    )
})
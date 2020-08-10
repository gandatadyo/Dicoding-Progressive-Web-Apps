
let urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/pages/home.html",
  "/pages/cart.html",
  "/pages/history.html",
  "/pages/account.html",
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/imgprofile.png",
  "/icon/icon72.png",
  "/icon/icon96.png",
  "/icon/icon128.png",
  "/icon/icon192.png",
  "/icon/icon384.png",
  "/icon/icon512.png",
  "/css/materialize.min.css",
  "/css/materialize.css",
  "/js/materialize.min.js",
  "/js/materialize.js",
  "/js/nav.js",
];
let CACHE_NAME = 'firstpwa-1';
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
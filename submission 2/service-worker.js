importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/favorite.html', revision: '1' },
    { url: '/css/materialize.css', revision: '1' },
    { url: '/js/materialize.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/main_db.js', revision: '1' },
    { url: '/pages/list_league.html', revision: '1' },
    { url: '/pages/list_standings.html', revision: '1' },
    { url: '/pages/info_team.html', revision: '1' },
    { url: '/pages/list_favorite.html', revision: '1' },
    { url: '/pages/info_team_favorite.html', revision: '1' },
    { url: '/service-worker.js', revision: '1' },
    { url: '/manifest.js', revision: '1' },
    { url: '/img/logo.png', revision: '1' },
    { url: '/img/icon72.png', revision: '1' },
    { url: '/img/icon96.png', revision: '1' },
    { url: '/img/icon128.png', revision: '1' },
    { url: '/img/icon192.png', revision: '1' },
    { url: '/img/icon384.png', revision: '1' },
    { url: '/img/icon512.png', revision: '1' },
], { ignoreUrlParametersMatching: [/.*/] });

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({ cahceName: 'api-data' })
);

workbox.routing.registerRoute(
    new RegExp('https://www.football-data.org/assets/'),
    workbox.strategies.staleWhileRevalidate({ cahceName: 'api-data' })
);

self.addEventListener('push', function (event) {
    let body;
    if (event.data) body = event.data.text();
    else body = 'Push message no payload';

    let options = {
        body: body,
        icon: '/img/logo.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
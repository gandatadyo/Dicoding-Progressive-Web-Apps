var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BIdIgKpwGtWLjLmKqnYJyEMOCWwP5uBDU6NFUDvEjSdgowi_GdNCA0Ni2uI8f4JSzBHh3eyfPLoulV84hj38f90",
   "privateKey": "d5fPmlRSRMmtTr-MGlRXU9Sg__UGVw7ByMgL-E6kGrk"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": " https://fcm.googleapis.com/fcm/send/dXfw54N1n00:APA91bEIWcD-eLPyF_UwsNXcHMvrwcQsNQqmK56lb3SMltjFEjU9jAAN0dPKAwstsT9yG1LSFygbugcNLnxQMl_rVYhu0Qq-j6_-vg-yNQIcJ58dxyK_yJBC1f8nO2EV9G2s_IgPBGev",
   "keys": {
      "p256dh": "BAKFaFPrOrDqbVUgCtKfKx0TvM7DtCJfQbTc0o5NDfI7Xti7AXOVq5EE9D2vUeNbY6vGpW4h0mCmuD2H5OIed/k=",
      "auth": "Ja1LNs9wtprBr6gaQ+yH0Q=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: 'dicoding-pwa-9f98d',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);

var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BGVouwswXYK_P3FVL3HHtWoEfJTv_z8v6a_YOdfqBFBwGF1_k99xhjgFnpJQcBB4717wPGtUp7LWXyGwbyXzFpo",
   "privateKey": "hUGP4MKWAeZ9LxzdWCdv0DXyPgTs7Ol2K0sXACM4HPs"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fK6x8XMh-i8:APA91bE4qcfkBgatFeS4Iqi3h64X_gJlGz72sb7V7QylsGZ40YlX-e1EhDeCKqExUgkz_27A45WjqjJAAn2maiB7SHLWp0uGk2n0m5iHFAjvwYtH3aKnsHXzRtMhiVFB8IbXyt8uHttO",
   "keys": {
      "p256dh": "BAKNTuv3lQt73Ocdzf4v94tO+M7xLG0X87WZDYDP+P6IMtgkwAR0j9shkwI56UEuzemN4BN6s0zaU4QYkVZ2hJI=",
      "auth": "N5/ssLHHl8L39nkthkQuGA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '291551144301',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
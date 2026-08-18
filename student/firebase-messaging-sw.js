// Version 10 Compat libraries use pannanum (Mukkiam!)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDoMIs_SHFKDD46rExb45LXpvEZqM08520",
    authDomain: "college-connect-ece97.firebaseapp.com",
    databaseURL: "https://college-connect-ece97-default-rtdb.firebaseio.com",
    projectId: "college-connect-ece97",
    storageBucket: "college-connect-ece97.firebasestorage.app",
    messagingSenderId: "852039198475",
    appId: "1:852039198475:web:0f05f283ea9b510424640e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background Notification Handle
messaging.onBackgroundMessage((payload) => {
    console.log('Background Message received:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/College-Connect/student/firebase-logo.png' // Icon path check pannikonga
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

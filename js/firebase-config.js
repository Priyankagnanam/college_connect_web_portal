import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase web configuration is public application configuration. Access control
// is enforced by Firebase Authentication and Realtime Database rules.
const firebaseConfig = {
    apiKey: "AIzaSyDoMIs_SHFKDD46rExb45LXpvEZqM08520",
    authDomain: "college-connect-ece97.firebaseapp.com",
    databaseURL: "https://college-connect-ece97-default-rtdb.firebaseio.com",
    projectId: "college-connect-ece97",
    storageBucket: "college-connect-ece97.firebasestorage.app",
    messagingSenderId: "852039198475",
    appId: "1:852039198475:web:0f05f283ea9b510424640e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db, firebaseConfig };

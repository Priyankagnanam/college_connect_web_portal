import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase web configuration is public application configuration. Access control
// is enforced by Firebase Authentication and Realtime Database rules.
const firebaseConfig = {
    apiKey: "AIzaSyAZOJh_a5oDaKluV3IU6Ly2o7PlTlSEbhQ",
    authDomain: "college-connect-2cd42.firebaseapp.com",
    databaseURL: "https://college-connect-2cd42-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "college-connect-2cd42",
    storageBucket: "college-connect-2cd42.firebasestorage.app",
    messagingSenderId: "16394931571",
    appId: "1:16394931571:web:38b8abc12ec26d7dc50906"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db, firebaseConfig };

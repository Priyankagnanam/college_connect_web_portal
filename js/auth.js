import { auth, db } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { get, ref, update } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/**
 * Formats the ID for Firebase keys (e.g., replaces '.' with '_').
 */
export function formatID(rawID) {
    if (!rawID) return "";
    return rawID.trim().replace(/\./g, '_').toUpperCase();
}

/**
 * Login User
 */
export async function loginUser(rawID, password) {
    if (!rawID || !password) {
        throw new Error("Please enter both ID and Password.");
    }

    let key;
    let credential;
    if (rawID.includes("@")) {
        credential = await signInWithEmailAndPassword(auth, rawID.trim(), password);
    } else {
        key = formatID(rawID);
        let snapshot;
        try {
            snapshot = await get(ref(db, `loginDirectory/${key}`));
        } catch (e) {
            const code = (e && (e.code || e.message) || "").toLowerCase();
            if (code.includes("permission") || code.includes("denied")) {
                throw new Error("User ID not found!");
            }
            throw e;
        }
        if (!snapshot.exists()) throw new Error("User ID not found!");
        credential = await signInWithEmailAndPassword(auth, snapshot.val().email, password);
    }
    const profileSnapshot = await get(ref(db, `profiles/${credential.user.uid}`));
    if (!profileSnapshot.exists()) throw new Error("Account profile not found.");
    const userData = profileSnapshot.val();
    key = key || formatID(userData.id);

    saveSession(key, { ...userData, uid: credential.user.uid });
    return { ...userData, uid: credential.user.uid, id: key };
}

/**
 * Register User
 */
export async function registerUser(data) {
    const { name, email, id, role, dept, year, password } = data;
    const dbID = formatID(id);

    if (role !== "student") throw new Error("Only student self-registration is allowed.");
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const profile = { name, email, id: dbID, rollNumber: id, role, dept, year, uid: credential.user.uid };
    try {
        await update(ref(db), {
            [`users/${dbID}`]: profile,
            [`profiles/${credential.user.uid}`]: profile,
            [`loginDirectory/${dbID}`]: { id, email, role, uid: credential.user.uid }
        });
    } catch (error) {
        try {
            await deleteUser(credential.user);
        } finally {
            await signOut(auth).catch(() => {});
        }
        throw error;
    }

    return true;
}

/**
 * Logout
 */
export async function logout() {
    await signOut(auth);
    sessionStorage.clear();
    window.location.href = window.location.pathname.includes("/") && window.location.pathname.includes("/student/")
        ? "../login.html"
        : "../login.html";
}

/**
 * Check Session
 * Returns user object if valid, else null (and redirects).
 */
export function checkSession(requiredRole = null) {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const role = sessionStorage.getItem("role");

    if (isLoggedIn !== "true") {
        window.location.href = "../login.html";
        return null;
    }

    if (requiredRole && role !== requiredRole) {
        alert("Unauthorized Access!");
        window.location.href = "../login.html";
        return null;
    }

    return {
        id: sessionStorage.getItem("userId"),
        name: sessionStorage.getItem("userName"),
        role: role,
        dept: sessionStorage.getItem("dept"),
        year: sessionStorage.getItem("year")
    };
}

export function saveSession(userId, userData) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("role", userData.role || "student");
    sessionStorage.setItem("userName", userData.name || "User");
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("studentID", userId);
    sessionStorage.setItem("userEmail", userData.email || "");
    sessionStorage.setItem("dept", userData.dept || "");
    sessionStorage.setItem("year", userData.year || "");
}

export function requireRole(requiredRole, onAuthorized) {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            unsubscribe();
            if (!firebaseUser) {
                window.location.replace("../login.html");
                resolve(null);
                return;
            }

            const profileSnapshot = await get(ref(db, `profiles/${firebaseUser.uid}`));
            const profile = profileSnapshot.exists() ? profileSnapshot.val() : null;
            if (!profile || profile.role !== requiredRole) {
                await signOut(auth);
                sessionStorage.clear();
                window.location.replace("../login.html");
                resolve(null);
                return;
            }

            const result = { id: formatID(profile.id), ...profile, uid: firebaseUser.uid };
            saveSession(result.id, result);
            if (onAuthorized) onAuthorized(result);
            resolve(result);
        });
    });
}

export async function resetPassword(identifier) {
    let email = String(identifier || "").trim();
    if (!email.includes("@")) {
        const snapshot = await get(ref(db, `loginDirectory/${formatID(email)}`));
        if (!snapshot.exists()) throw new Error("User ID not found!");
        email = snapshot.val().email;
    }
    return sendPasswordResetEmail(auth, email);
}

// Client-side navigation guard. Firebase Rules remain the security boundary.
(function () {
    const path = window.location.pathname;
    const requiredRole = path.includes("/admin/") ? "admin" : path.includes("/student/") ? "student" : null;
    if (!requiredRole) return;

    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const role = sessionStorage.getItem("role");
    if (!loggedIn || role !== requiredRole) {
        window.location.replace("../login.html");
    }
})();

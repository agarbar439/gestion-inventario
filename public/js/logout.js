// Funcion para cerrar sesión
function logout() {
    // Eliminar el token de localStorage
    localStorage.removeItem('token');

    // Redirigir al usuario a la página de login
    window.location.href = '/login.html';

}

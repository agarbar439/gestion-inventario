

// Verifica el token antes de cargar el contenido estático
const token = localStorage.getItem('token');
if (!token) {
    // Si no hay token, redirige al login
    window.location.href = '/login.html';
}

fetch('/api/verify-token', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
    .then(res => {
        if (!res.ok) {
            // Si el token no es válido, redirige al login
            window.location.href = '/login.html';
        }
    })
    .catch(err => {
        // Si ocurre un error en la verificación, redirige al login
        window.location.href = '/login.html';
    });
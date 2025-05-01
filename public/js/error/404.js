


// Verifica el token antes de cargar el contenido estático
const token = localStorage.getItem('token');
if (!token) {
    // Si no hay token, redirige al login
    window.location.href = '/login.html';
}

// Hacer peticion para validar el token
const response = fetch('/api/verify-token', {
    headers: {
        'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
    }
})

if (!response.ok) throw new Error(`Error: ${response.statusText}`);


/*
// Mostrar el contenido del 404 error
let mostrarDiv = document.getElementById("content");
mostrarDatosError(mostrarDiv);


function mostrarDatosError(idDiv) {
    const divId = document.getElementById(idDiv);
    divId.innerHTML = ""; // Limpiarlo de contenido

    // Mostrar los titulos y parrafos
    const titulo = document.createElement("h1");
    titulo.textContent = "404 - Página no encontrada";

    const parrafo = document.createElement("p");
    parrafo.textContent = "Lo sentimos, la página que buscas no existe.";

    // Añadirlos al div
    divId.appendChild(titulo);
    divId.appendChild(parrafo);
}*/
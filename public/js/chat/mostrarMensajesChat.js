document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    mostrarMensajesOrdenados();

});

// Funcion para obtener los mensajes desde la API
export async function obtenerMensajes() {
    const token = localStorage.getItem('token'); // Obtener el token guardado

    // Si no esta autenticado, redirigir a la pagina de inicio
    if (!token) {
        window.location.href = '/login.html'
    }

    try {
        // Hacer la peticion con el token para obtener los mensajes
        const mensajes = await fetch('/api/mensajes', {
            method: "get",
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
                'Content-Type': 'application/json'
            }
        })
        if (!mensajes.ok) {
            throw new Error(`Error en la solicitud: ${mensajes.statusText}`);
        }
        // Devolver los mensajes
        return mensajes.json();
    } catch (error) {
        console.error("Error al obtener los mensajes ", error);
    }
}

// Funcion para obtener el usuario actual de la sesion
async function obtenerUsuarioActual() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token no encontrado.");
        return null;
    }

    try {
        const response = await fetch("/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("No se pudieron obtener los datos del usuario");

        return await response.json();
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}


// Funcion para mostrar todos los usuarios
async function obtenerTodosUsuarios() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token no encontrado.");
        return null;
    }

    try {
        const response = await fetch("/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("No se pudieron obtener los datos del usuario");

        return await response.json();
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}

// Funcion para mostrar los mensajes ordenador por fecha
export async function mostrarMensajesOrdenados() {
    const contenedorMensajes = document.getElementById("mensajes");
    contenedorMensajes.innerHTML = ""; // Limpia el contenedor

    const mensajes = await obtenerMensajes();
    const usuarioActual = await obtenerUsuarioActual();
    const usuarios = await obtenerTodosUsuarios();

    if (!mensajes || !usuarioActual || !usuarios) return;

    // Ordenar todos los mensajes por fecha ascendente
    mensajes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

    mensajes.forEach(msg => {
        const esUsuarioActual = msg.id_usuario === usuarioActual.id;

        // Crear burbuja de mensaje
        const burbuja = document.createElement("div");
        burbuja.classList.add(esUsuarioActual ? "mensajeUsuario" : "mensaje");

        // Crear info
        const info = document.createElement("div");
        info.classList.add("info-mensaje");

        const fecha = new Date(msg.fecha).toLocaleString();

        let nombre = "Tú";
        if (!esUsuarioActual) {
            const usuarioRemitente = usuarios.find(u => u.id_usuario === msg.id_usuario);
            nombre = usuarioRemitente ? `${usuarioRemitente.nombre} ${usuarioRemitente.apellidos}` : "Usuario desconocido";
        }

        info.innerHTML = `${nombre} <span class="fecha">${fecha}</span>`;

        // Contenido
        const contenido = document.createTextNode(msg.contenido);

        // Construir
        burbuja.appendChild(info);
        burbuja.appendChild(contenido);

        contenedorMensajes.appendChild(burbuja);
    });

    // Scroll al final del chat
    contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight;
}



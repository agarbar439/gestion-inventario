document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    mostrarMensajeLocal();
    console.log(await obtenerUsuarioActual())
});

// Funcion para obtener los mensajes desde la API
async function obtenerMensajes() {
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

// Mostrar los mensajes (lado derecho) del usuario que los envia
async function mostrarMensajeLocal() {
    let contenedorMensajes = document.getElementById("mensajes");
    // Obtener los mensajes
    const mensaje = await obtenerMensajes();

    // Obtener el usuario actual
    const usuarioActual = await obtenerUsuarioActual();

    if (!mensaje || !usuarioActual) return;

    // Recorrer los mensajes
    mensaje.forEach(element => {

        // Comprobar si son el mismo id de usuario
        if (usuarioActual.id === element.id_usuario) {
            // Crear el contenedor del mensaje
            const burbuja = document.createElement("div");
            burbuja.classList.add("mensajeUsuario")

            // Crear la info + fecha
            const info = document.createElement("div");
            info.classList.add("info-mensaje");
            const fecha = new Date(element.fecha).toLocaleString(); // Asegúrate de que 'fecha' venga en el objeto
            info.innerHTML = `Tú <span class="fecha">${fecha}</span>`;

            // Agregar el contenido del mensaje
            const contenido = document.createTextNode(element.contenido);

            // Añadir todo a la burbuja
            burbuja.appendChild(info);
            burbuja.appendChild(contenido);

            contenedorMensajes.appendChild(burbuja);
        }
    });
}
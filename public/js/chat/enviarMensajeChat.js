import { obtenerMensajes } from "./mostrarMensajesChat.js";

document.addEventListener("DOMContentLoaded", function () {
    const botonEnviar = document.getElementById("enviarMensaje");

    botonEnviar.addEventListener("click", async () => {
        await enviarMensaje();
        //        await mostrarMensajesOrdenados(); // Para recargar los mensajes con el nuevo incluido
        document.getElementById("contenidoMensaje").value = ""; // Limpiar textarea
        await obtenerMensajes(); // 🔁 Recargar mensajes después de enviar

    });


});
// Funcion para enviar el mensaje
const socket = io();

// Prompt for setting a username
let username;
async function enviarMensaje() {
    // Obtener los datos del mensaje

    let datos = await recibirMensaje();

    const token = localStorage.getItem('token'); // Obtener el token guardado

    // Si no esta autenticado, redirigir a la pagina de inicio
    if (!token) {
        window.location.href = '/login.html'
    }

    try {
        // Hacer la peticion con el token para obtener los mensajes
        const mensajes = await fetch('/mensajes', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contenido: datos.contenido,
                id_usuario: datos.id
            })
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

// Obtener el contenido del mensaje y el ID del usuario
async function recibirMensaje() {
    let mensaje = document.getElementById("contenidoMensaje").value;
    let usuario = await obtenerUsuarioActual();

    return {
        contenido: mensaje,
        //   id: usuario.id
    };
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
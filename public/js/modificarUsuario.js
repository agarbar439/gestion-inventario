import { mostrarAlerta } from './alertas.js';

document.addEventListener("DOMContentLoaded", function () {
    obtenerRellenarDatos(); // Obtener datos del usuario al cargar
    document.getElementById("registroForm").addEventListener("submit", actualizarDatosUsuario); // Vincular submit
});

// Obtener y rellenar el formulario con los datos del usuario
async function obtenerRellenarDatos() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("Token no encontrado.");
        return;
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

        const data = await response.json();

        document.getElementById("editUserId").value = data.id;
        document.getElementById("nombre").value = data.nombre;
        document.getElementById("apellidos").value = data.apellidos;
        document.getElementById("nombre_usuario").value = data.nombre_usuario;
        document.getElementById("correo").value = data.correo;

    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
    }
}

// Actualizar los datos del usuario
async function actualizarDatosUsuario(event) {
    event.preventDefault(); // Prevenir recarga de página

    const idUser = document.getElementById("editUserId").value;
    const data = {
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        nombre_usuario: document.getElementById("nombre_usuario").value,
        correo: document.getElementById("correo").value,
    };

    try {
        const response = await fetch(`/users/${idUser}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        mostrarAlerta("Usuario editado correctamente", "exito");

    } catch (error) {
        console.error("Error al editar el usuario:", error);
    }
}

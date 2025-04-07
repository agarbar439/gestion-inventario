import { mostrarAlerta } from "./alertas.js";

// Mostrar los usuarios en el select al cargar la pagina
document.addEventListener("DOMContentLoaded", async function cargarDatos() {

    try {
        // Obtener los usuarios
        const usuarios = await obtenerUsuarios();
        // Obtener el contenedor
        const selectEliminar = document.getElementById("selectEliminarUser");

        // Recorrer todos los usuarios y añadir el correo al select
        usuarios.forEach(elemento => {
            let option = document.createElement("option");
            option.value = elemento.id_usuario;
            option.textContent = elemento.correo;
            selectEliminar.appendChild(option);
        });

    } catch (error) {
        console.log('Error al cargar datos:', error);
    }

});


// Función para obtener los usuarios
async function obtenerUsuarios() {
    const token = localStorage.getItem('token'); // Obtener el token guardado

    const userResponse = await fetch('/users', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            'Content-Type': 'application/json'
        }
    });

    if (!userResponse.ok) {
        throw new Error(`Error en la solicitud: ${userResponse.statusText}`);
    }

    return await userResponse.json();
}

// Obtener el formulario y el select
const formulario = document.getElementById("formEliminarUsuario");
const selectEliminarUser = document.getElementById("selectEliminarUser");

// Función para eliminar un usuario
async function eliminarUsuario(id) {
    const token = localStorage.getItem('token'); // Obtener el token guardado

    if (!id) {
        alert("Por favor selecciona un usuario.");
        return;
    }

    const response = await fetch(`/users/${id}`, {
        method: 'DELETE', // Usamos DELETE para eliminar al usuario
        headers: {
            'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    mostrarAlerta("Usuario Eliminado correctamente", "exito");

    // Eliminar la opción del usuario en el select
    const optionToRemove = document.querySelector(`#selectEliminarUser option[value="${id}"]`);
    if (optionToRemove) {
        optionToRemove.remove(); // Eliminar la opción correspondiente
    }

    // Limpiar la selección del select
    selectEliminarUser.value = "";
}

// Agregar el event listener al formulario para evitar el envío por defecto
formulario.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const idUsuario = selectEliminarUser.value; // Obtener el ID del usuario seleccionado
    eliminarUsuario(idUsuario); // Llamar a la función para eliminar el usuario
});
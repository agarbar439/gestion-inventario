document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    const token = localStorage.getItem('token'); // Obtener el token guardado

    // Si ya está autenticado, redirigir a la página principal
    if (token) {
        // Aquí podrías validar el token con un servidor si lo deseas
        // Si es válido, redirigir al usuario
        window.location.href = '/';
        return;
    }
});

document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que la página se recargue

    const nombre_usuario = document.getElementById("nombre_usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre_usuario, contrasena }),
        });

        const data = await response.json();

        if (response.ok) {
            // Guarda el token en el navegador
            localStorage.setItem("token", data.token);

            // Redirigir a la página principal
            window.location.href = "/";
        } else {
            alert("data.error"); // Muestra el mensaje de error si hay problemas
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error en el servidor.");
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        //alert("Debes iniciar sesión.");
        window.location.href = "/login";
        return;
    }

    // Verificar si estamos en añadir_usuario.html y protegerlo
    if (window.location.pathname.includes("anadir_usuario.html")) {
        try {
            const response = await fetch("/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("No autorizado");

            const data = await response.json();

            // Si el usuario no es rol administrador
            if (data.rol !== "administrador") {
                //alert("No tienes permisos para acceder a esta página.");
                window.location.href = "/403.html"; // Redirigir a pagina 403
                return;
            }
        } catch (error) {
            console.error("Error al verificar rol del usuario:", error);
            alert("Hubo un problema al verificar tu acceso.");
            window.location.href = "/";
            return;
        }
    }

    // Manejo del formulario de registro de usuario
    const registroForm = document.getElementById("registroForm");
    if (registroForm) {
        registroForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const data = {
                nombre: document.getElementById("nombre").value,
                apellidos: document.getElementById("apellidos").value,
                nombre_usuario: document.getElementById("nombre_usuario").value,
                correo: document.getElementById("correo").value,
                contrasena: document.getElementById("contrasena").value,
                rol: document.getElementById("rol").value
            };

            try {
                const response = await fetch("/usuarios/registrar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Error al registrar usuario");
                }

                alert("Usuario registrado con éxito");
                window.location.reload();

            } catch (error) {
                console.error("Error:", error);
                alert(error.message);
            }
        });
    }
});

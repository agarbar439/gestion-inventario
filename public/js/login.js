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
            localStorage.setItem("token", data.token); // Guarda el token en el navegador
            alert("Inicio de sesión exitoso");
            window.location.href = "/"; // Redirigir a otra página
        } else {
            alert(data.error); // Muestra el mensaje de error si hay problemas
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error en el servidor.");
    }
});
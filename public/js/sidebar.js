document.addEventListener("DOMContentLoaded", function () {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    if (!token) {
        console.error('Token no encontrado, el usuario no está autenticado');
        return;
    }

    fetch("./components/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector(".sidebar-container").innerHTML = data;

            // Después de cargar el sidebar, hacer la petición para obtener el usuario
            return fetch('/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
                    'Content-Type': 'application/json'
                }
            });
        })
        .then(response => response.json())
        .then(data => {
            console.log('Nombre de usuario:', data.nombre_usuario);
            console.log('Rol del usuario:', data.rol);
            // Si el rol es administrador, mostrar los links de administrador
            if (data.rol === "administrador") {
                document.getElementById("admin-links").style.display = "block";
            } else {
                document.getElementById("admin-links").style.display = "none";
            }
        })
        .catch(error => console.error("Error al cargar el sidebar o los datos del usuario:", error));
});
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("active");
}

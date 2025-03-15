// Cargar el sidebar
document.addEventListener("DOMContentLoaded", function () {
    fetch("./components/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector(".sidebar-container").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el sidebar:", error));
});

// Función para abrir y cerrar el sidebar al hacer clic en el botón de "hamburguesa"
/*function toggleSidebar() {
    var sidebar = document.querySelector('.sidebar');
    var hamburger = document.querySelector('.hamburger');

    // Alternar el tamaño del sidebar
    sidebar.style.width = sidebar.style.width === '0px' ? '250px' : '0px';

    // Cambiar el color del icono del botón hamburguesa
    hamburger.classList.toggle('open');
}*/
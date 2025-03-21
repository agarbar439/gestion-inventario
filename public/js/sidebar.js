// Cargar el sidebar
document.addEventListener("DOMContentLoaded", function () {
    fetch("./components/sidebar.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector(".sidebar-container").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el sidebar:", error));
});

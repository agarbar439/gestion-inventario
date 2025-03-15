
// Funcion para mostrar el numero de productos y categorias
document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    try {
        // Obtener número de categorías
        const categoriasResponse = await fetch('/categorias');
        const categorias = await categoriasResponse.json();
        document.getElementById("nCategorias").textContent = categorias.length;

        // Obtener número de productos
        const productosResponse = await fetch('/productos');
        const productos = await productosResponse.json();
        document.getElementById("nProductos").textContent = productos.length;
    } catch (error) {
        console.log('Error al cargar datos:', error);
    }
});


// Funcion para mostrar el numero de productos y categorias
document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado
        // Si no esta autenticado, redirigir a la pagina de inicio
        if (!token) {
            window.location.href = '/login.html'
        }



        // Obtener número de categorías
        const categoriasResponse = await fetch('/categorias', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });

        const categorias = await categoriasResponse.json();
        document.getElementById("nCategorias").textContent = categorias.categorias.length;

        // Obtener número de productos
        const productosResponse = await fetch('/productos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });


        const productos = await productosResponse.json();
        document.getElementById("nProductos").textContent = productos.length;
    } catch (error) {
        console.log('Error al cargar datos:', error);
    }
});

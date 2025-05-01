
// Funcion para mostrar el numero de productos y categorias
document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado
        // Si no esta autenticado, redirigir a la pagina de inicio
        if (!token) {
            window.location.href = '/login.html'
            return;
        }
        console.log(token)
        // Obtener número de categorías
        const categoriasResponse = await fetch('/categorias', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });

        if (categoriasResponse.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('token');
            window.location.href = '/login.html';
            return;
        }

        const categorias = await categoriasResponse.json();
        document.getElementById("nCategorias").textContent = categorias.length; // Mostrar en el index el numero de categorias

        // Peticion para Obtener número de productos
        const productosResponse = await fetch('/productos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });
        if (productosResponse.status === 401) {
            // Token inválido o expirado
            localStorage.removeItem('token');
            window.location.href = '/login.html';
            return;
        }

        const productos = await productosResponse.json();
        document.getElementById("nProductos").textContent = productos.length; // Mostrar en el index el numero de productos
    } catch (error) {
        console.log('Error al cargar datos:', error);
        window.location.href = '/login.html'; // En caso de error, redirige al login

    }
});

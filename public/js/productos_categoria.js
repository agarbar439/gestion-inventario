import { mostrarAlerta } from "./alertas.js"; // Importar las alertas

// Función principal para inicializar la aplicación
async function init() {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado

        // Si no esta autenticado, redirigir a la pagina de inicio
        if (!token) {
            window.location.href = '/login.html'
        }

        await cargarCategorias(); // Llenar el desplegable de categorías al cargar
        await cargarProductos(); // Llenar la tabla de productos
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }

    configurarModal(); // Configurar el modal de productos
    configurarFormulario(); // Configurar el formulario de productos
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", init);


// Función para manejar el modal de agregar producto
function configurarModal() {
    const modal = document.getElementById("modal");
    const addProductBtn = document.getElementById("addProduct");
    const closeModal = document.querySelector(".close");

    addProductBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Configuración del formulario
function configurarFormulario() {
    const form = document.getElementById("productForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = obtenerDatosFormulario(formData);

        if (!validarFormulario(data)) {
            mostrarAlerta("Error: Completa todos los campos", "warning", true);
            return;
        }

        agregarProducto(data);
        form.reset();
    });
}

// Obtener los datos del formulario
function obtenerDatosFormulario(formData) {
    return {
        nombre: formData.get("nombre")?.trim(),
        descripcion: formData.get("descripcion")?.trim(),
        id_categoria: parseInt(formData.get("categoria")) || 0,
        precio_compra: parseFloat(formData.get("precio_compra")) || 0,
        precio_venta: parseFloat(formData.get("precio_venta")) || 0,
        stock: parseInt(formData.get("stock")) || 0
    };
}


// Validar los datos del formulario
function validarFormulario(data) {
    return data.nombre && data.descripcion && data.id_categoria > 0 && data.precio_compra > 0 &&
        data.precio_venta > 0 && data.stock >= 0;
}


// Función para obtener las categorías desde la API
async function cargarCategorias() {
    const token = localStorage.getItem('token'); // Obtener el token guardado

    try {
        const response = await fetch('/categorias', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const categorias = await response.json();
        const selectCategorias = document.getElementById("categoriaSelect");

        selectCategorias.innerHTML = ""; // Limpiar antes de agregar nuevas opciones

        categorias.forEach(categoria => {
            const option = document.createElement("option");
            option.value = categoria.id_categoria;
            option.textContent = categoria.nombre;
            selectCategorias.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}

// Función para obtener y mostrar productos
async function cargarProductos() {
    try {
        // Obtener el ID de la categoría desde la URL
        const params = new URLSearchParams(window.location.search);
        const idCategoria = params.get("id_categoria");

        if (!idCategoria) {
            console.error("No se proporcionó una categoría válida.");
            return;
        }

        // Hacer la petición a la API con la categoría seleccionada
        const response = await fetch(`/productos/categoria/${idCategoria}`);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const productos = await response.json();
        const tabla = document.getElementById("tablaProductos");
        tabla.innerHTML = "";

        productos.rows.forEach(producto => {
            console.log(productos)
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.categoria.nombre}</td>
                <td>${producto.precio_compra} €</td>
                <td>${producto.precio_venta} €</td>
                <td>${producto.stock}</td>
                <td class="actions">
                    <button class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                </td>
            `;
            tabla.appendChild(fila);

            // Asignar el evento click al botón de eliminación
            const botonEliminar = fila.querySelector('.delete');
            botonEliminar.addEventListener('click', () => eliminarProducto(producto.id_producto));

        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Funcion para agregar un producto nuevo
async function agregarProducto(data) {
    try {
        const response = await fetch("/productos/agregar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        document.getElementById("modal").style.display = "none";
        mostrarAlerta("Producto agregado correctamente", "exito");
        cargarProductos(); // Actualizar productos
    } catch (error) {
        console.error("Error al agregar producto:", error);
        mostrarAlerta("Error: Error al agregar el producto", "error", true);
    }
}

// Función para editar un producto
async function editarProducto(id, data) {
    try {
        const response = await fetch(`/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        mostrarAlerta("Producto actualizado correctamente", "exito");
        cargarProductos(); // Recargar productos después de la eliminación
    } catch (error) {
        console.error("Error al editar el producto:", error);
    }
}

// Función para eliminar un producto
async function eliminarProducto(id) {
    try {
        const response = await fetch(`/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        mostrarAlerta("Producto eliminado correctamente", "exito");
        cargarProductos(); // Recargar productos después de la eliminación
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}


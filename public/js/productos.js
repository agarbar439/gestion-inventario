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
    configurarModal2();
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


// Configuracion del modal de edicion
function configurarModal2() {
    const modal = document.getElementById("modal2");
    const closeModal = document.querySelector(".close");

    // Cerrar modal al hacer clic en el botón de cerrar
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera de la caja del modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Manejar la actualización del producto
    document.getElementById("productFormEdit").addEventListener("submit", async function (event) {
        event.preventDefault();

        const id = document.getElementById("editProductId").value; // Obtener ID del producto
        const data = {
            nombre: document.getElementById("editNombre").value,
            descripcion: document.getElementById("editDescripcion").value,
            id_categoria: parseInt(document.getElementById("editCategoriaSelect").value),
            precio_compra: parseFloat(document.getElementById("editPrecioCompra").value),
            precio_venta: parseFloat(document.getElementById("editPrecioVenta").value),
            stock: parseInt(document.getElementById("editStock").value)
        };
        try {
            const response = await fetch(`/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            modal.style.display = "none"; // Cerrar modal tras la edición
            mostrarAlerta("Producto editado correctamente", "exito"); // Mostrar alerta

            cargarProductos(); // Recargar lista de productos
        } catch (error) {
            console.error("Error al editar el producto:", error);
            alert("No se pudo actualizar el producto");
        }
    });
}

// Función para abrir el modal con los datos del producto
function abrirModalEdicion(producto) {
    document.getElementById("editProductId").value = producto.id_producto;
    document.getElementById("editNombre").value = producto.nombre;
    document.getElementById("editDescripcion").value = producto.descripcion;
    document.getElementById("editCategoriaSelect").value = producto.categoria.id_categoria;

    document.getElementById("editPrecioCompra").value = producto.precio_compra;
    document.getElementById("editPrecioVenta").value = producto.precio_venta;
    document.getElementById("editStock").value = producto.stock;

    document.getElementById("modal2").style.display = "flex";
}

// Función para obtener las categorías desde la API
async function cargarCategorias() {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado

        const response = await fetch('/categorias', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const categorias = await response.json();

        // Llenar el select de agregar  editar producto con las categorias
        llenarSelect("categoriaSelect", categorias);
        llenarSelect("editCategoriaSelect", categorias)


    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
}

// Funcion para llenar el select de categorias al añadir o editar un producto
function llenarSelect(selectId, categorias) {
    const select = document.getElementById(selectId);
    select.innerHTML = ""; // Limpiar antes de agregar nuevas opciones

    categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria.id_categoria;
        option.textContent = categoria.nombre;
        select.appendChild(option);
    });
}

// Función para obtener y mostrar productos
async function cargarProductos() {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado

        const response = await fetch('/productos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const productos = await response.json();
        const tabla = document.getElementById("tablaProductos");
        tabla.innerHTML = "";

        productos.forEach(producto => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.descripcion}</td>
                <td>
                    <a href="/productos_categoria.html?id_categoria=${producto.categoria.id_categoria}">
                        ${producto.categoria.nombre}
                    </a>
                </td>
                <td>${producto.precio_compra} €</td>
                <td>${producto.precio_venta} €</td>
                <td>${producto.stock}</td>
                <td class="actions">
                    <button id="editarProducto" class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                </td>
            `;
            tabla.appendChild(fila);

            // Asignar el evento click al botón de eliminación
            const botonEliminar = fila.querySelector('.delete');
            botonEliminar.addEventListener('click', () => eliminarProducto(producto.id_producto));

            // Asignar el evento click al botón de editar
            const botonEditar = fila.querySelector('.edit');
            botonEditar.addEventListener('click', () => abrirModalEdicion(producto));
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Funcion para agregar un producto nuevo
async function agregarProducto(data) {
    try {
        const token = localStorage.getItem('token'); // Obtener el token guardado

        const response = await fetch("/productos/agregar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            },
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
/*async function editarProducto(id, data) {
    try {
        const response = await fetch(`/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        document.getElementById("modal").style.display = "none";

        mostrarAlerta("Producto actualizado correctamente", "exito");
        cargarProductos(); // Recargar productos después de la eliminación
    } catch (error) {
        console.error("Error al editar el producto:", error);
    }
}*/

// Función para eliminar un producto
async function eliminarProducto(id) {
    const token = localStorage.getItem('token'); // Obtener el token guardado

    try {
        const response = await fetch(`/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token JWT en la cabecera
            }
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        mostrarAlerta("Producto eliminado correctamente", "exito");
        cargarProductos(); // Recargar productos después de la eliminación
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}


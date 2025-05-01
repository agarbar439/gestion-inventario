
// Función principal para inicializar la aplicación
async function init() {
    configurarModal(); // Configurar el modal de productos
    configurarFormulario(); // Configurar el formulario de productos
    configurarModal2(); // Configurar el modal de productos
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", init);

// Función para manejar el modal de editar producto
function configurarModal() {
    const modal = document.getElementById("modal");
    const editProductBtn = document.getElementById("editarProducto");
    const closeModal = document.querySelector(".close");

    editProductBtn.addEventListener("click", function () {
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
document.addEventListener("DOMContentLoaded", function () {
});

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
            id_categoria: document.getElementById("editCategoriaSelect").value,
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
            alert("Producto actualizado correctamente");
            cargarProductos(); // Recargar lista de productos
        } catch (error) {
            console.error("Error al editar el producto:", error);
            alert("No se pudo actualizar el producto");
        }
    });
}

// Función para abrir el modal con los datos del producto
function abrirModalEdicion(producto) {
    document.getElementById("editProductId").value = producto.id;
    document.getElementById("editNombre").value = producto.nombre;
    document.getElementById("editDescripcion").value = producto.descripcion;
    document.getElementById("editCategoriaSelect").value = producto.categoria;
    document.getElementById("editPrecioCompra").value = producto.precio_compra;
    document.getElementById("editPrecioVenta").value = producto.precio_venta;
    document.getElementById("editStock").value = producto.stock;

    document.getElementById("modal2").style.display = "flex";

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

        agregarProducto(id, data);
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
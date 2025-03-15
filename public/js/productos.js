import { mostrarAlerta } from "./alertas.js"; // Importar las alertas

// Función principal para inicializar la aplicación
async function init() {
    try {
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


// Función para manejar el modal
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

        try {
            const response = await fetch("/productos/agregar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error(`Error: ${response.statusText}`);

            form.reset();
            document.getElementById("modal").style.display = "none";
            mostrarAlerta("Producto agregado correctamente", "exito");
            cargarProductos(); // Actualizar productos
        } catch (error) {
            console.error("Error al agregar producto:", error);
            mostrarAlerta("Error: Error al agregar el producto", "error", true);
        }
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
    try {
        const response = await fetch('/categorias');
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

// 🔹 Función para obtener y mostrar productos
async function cargarProductos() {
    try {
        const response = await fetch('/productos');
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
                    <a href="/productos/categoria/${producto.categoria.id_categoria}">
                        ${producto.categoria.nombre}
                    </a>
                </td>
                <td>${producto.precio_compra} €</td>
                <td>${producto.precio_venta} €</td>
                <td>${producto.stock}</td>
                <td class="actions">
                    <button class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                </td>
            `;
            tabla.appendChild(fila);
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}


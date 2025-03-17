document.addEventListener("DOMContentLoaded", async function cargarDatos() {
    try {
        // Obtener las categorías
        const categorias = await obtenerCategorias();

        // Obtener el contenedor
        const contenido = document.querySelector(".content");

        // Imágenes asociadas con cada categoría
        const imagenesCategorias = {
            "Bebidas": "url('./img/categorias/bebida.jpg')",
            "Carnes": "url('./img/categorias/carne.jpg')",
            "Frutas": "url('./img/categorias/fruta.jpg')",
            "Lácteos": "url('./img/categorias/lacteos.jpeg')",
            "Panadería": "url('./img/categorias/pan.jpeg')",
            "Verduras": "url('./img/categorias/verduras.jpg')",
        };

        // Crear tarjetas para cada categoría
        categorias.forEach(categoria => {
            const card = crearTarjeta(categoria, imagenesCategorias);
            contenido.appendChild(card);
        });

    } catch (error) {
        console.log('Error al cargar datos:', error);
    }
});

// Función para obtener las categorías
async function obtenerCategorias() {
    const categoriasResponse = await fetch('/categorias');
    if (!categoriasResponse.ok) {
        throw new Error(`Error en la solicitud: ${categoriasResponse.statusText}`);
    }
    return await categoriasResponse.json();
}

// Función para crear una tarjeta
function crearTarjeta(categoria, imagenesCategorias) {
    const cardDiv = document.createElement("div");
    const cardContent = document.createElement("div");
    const cardTitle = document.createElement("p");

    cardTitle.textContent = categoria.nombre;

    // Establecer imagen de fondo 
    if (imagenesCategorias[categoria.nombre]) {
        console.log("Imagen de fondo: ", imagenesCategorias[categoria.nombre]); // Verifica la URL
        cardDiv.style.backgroundImage = imagenesCategorias[categoria.nombre];
        cardDiv.style.backgroundSize = 'cover';
        cardDiv.style.backgroundPosition = 'center';
        cardDiv.style.height = '200px';
    } else {
        console.log("No se encontró imagen para: ", categoria.nombre); // Verifica si falta la imagen
    }


    // Crear enlace que envuelve toda la tarjeta
    const link = document.createElement("a");
    link.href = `productos_categoria.html?id_categoria=${categoria.id_categoria}`;
    link.classList.add("card-link");

    // Crear overlay y contenido
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    cardDiv.appendChild(overlay);

    cardContent.appendChild(cardTitle);
    cardDiv.appendChild(cardContent);

    // Añadir todo al enlace
    link.appendChild(cardDiv);

    // Añadir clases para estilo
    cardDiv.classList.add("card");
    cardContent.classList.add("card-content");
    cardTitle.classList.add("card-title");

    return link; // Devolver el enlace
}

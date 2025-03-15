function mostrarAlerta(mensaje, tipo = "exito", enModal = false) {
    let alerta;

    if (enModal) {
        // Obtener el div de alerta dentro del modal
        alerta = document.getElementById("alertaModal");
    } else {
        // Si es una alerta general (fuera del modal)
        alerta = document.getElementById("alerta");
    }

    // Resetear clases previas
    alerta.className = "alerta-modal";  // Usamos la clase para la alerta del modal

    // Definir color y icono según el tipo
    let icono = "";
    switch (tipo) {
        case "exito":
            alerta.classList.add("alerta-exito");
            icono = "✔️";
            break;
        case "error":
            alerta.classList.add("alerta-error");
            icono = "❌";
            break;
        case "info":
            alerta.classList.add("alerta-info");
            icono = "ℹ️";
            break;
        case "warning":
            alerta.classList.add("alerta-warning");
            icono = "⚠️";
            break;
    }

    // Insertar el mensaje con el icono
    alerta.innerHTML = `<i>${icono}</i> ${mensaje}`;

    // Mostrar la alerta con animación
    alerta.style.display = "flex"; // Asegurarse de que se muestre
    alerta.style.opacity = "1"; // Hacerla visible

    // Ocultar la alerta después de 5 segundos
    setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => {
            alerta.style.display = "none"; // Ocultarla completamente
        }, 500); // Esperar a que termine la animación de salida
    }, 5000);
}

// Exportar para usarlo en otros archivos
export { mostrarAlerta };

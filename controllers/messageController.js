import chatService from '../services/chatService.js';
export class messageController {

    // Función para crear el mensaje
    static async enviarMensaje(req, res) {

        try {
            const { contenido } = req.body;
            const id_usuario = req.user.id;
            const mensaje = await chatService.crearMensaje(id_usuario, contenido);
            res.status(201).json(mensaje);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el mensaje', error });

        }

    }

    // Funcion para obtener el mensaje
    static async verMensajes(req, res) {
        try {
            const message = await chatService.obtenerMensaje();

            // Si no se encuentra el mensaje
            if (!message) {
                return res.status(404).json({ message: "Mensaje no encontrado." });
            }
            // Devolver el mensaje
            res.status(200).json(message);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el mensaje", error });

        }
    }

}
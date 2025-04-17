import Mensaje from "../models/messages.js";
import User from '../models/user.js';  // Importamos el modelo User

const chatService = {
    // Crear los mensajes con el id del usuario y el contenido del mensaje
    async crearMensaje(id_usuario, contenido) {
        try {
            const createMessage = await Mensaje.create({ id_usuario, contenido });
            return createMessage;
        } catch (error) {
            console.error('Error al crear el mensaje:', error);
            throw error;
        }
    },

    async obtenerMensaje() {
        try {
            const getMessage = await Mensaje.findAll({
                include: [{
                    model: User,
                    as: 'usuario',
                    attributes: ['nombre_usuario'],
                }],
                order: [['fecha', 'ASC']],
            });

            return getMessage;
        } catch (error) {
            console.error('Error al recibir el mensaje:', error);
            throw error;
        }
    }

}

export default chatService;
import { allUsers, deleteUser, modifyUser } from "../services/userService.js";
import { validateUpdateUser } from "../utils/validation.js";

export class userController {
    // Método para obtener todos los usuarios
    static async getAllUsers(req, res) {
        try {
            const users = await allUsers(); // Obtenemos los usuarios desde el servicio
            res.status(200).json(users); // Respondemos con los usuarios en formato JSON
        } catch (error) {
            console.error('Error en el controlador al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
        }
    }

    // Método para eliminar un usuario
    static async deleteUser(req, res) {
        // Obtener el parametro id de la request
        const { id } = req.params;
        try {
            // Almacenar el usuario a borrar, buscando por el id
            const deleteUserById = await deleteUser(id);

            // Si no se encuentra el usuario, devolver 404
            if (!deleteUserById) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }

            // Devolver mensaje de éxito
            res.status(200).json({ message: "Usuario eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el producto", error });
        }
    }

    // Funcion para actualizar un usuario
    static async updateUser(req, res) {
        const { id } = req.params;
        const updateData = req.body;

        try {
            // Validar solo los campos enviados en la actualización
            const validation = validateUpdateUser.safeParse(updateData)

            if (!validation.success) {
                return res.status(400).json({ error: validation.error.errors })
            }

            // Llamar al servicio para actualizar el usuarioo
            const updatedUser = await modifyUser(id, validation.data);

            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }
            // Devolver el usuario
            res.status(200).json(updatedUser);

        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el usuario", error });

        }
    }

}


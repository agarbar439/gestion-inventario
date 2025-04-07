import User from '../models/user.js';  // Importamos el modelo User

// Funcion para obtener todos los usuarios
const allUsers = async () => {
    try {
        const users = await User.findAll();
        return users;

    } catch (error) {
        console.error('Error al recibir los datos:', error);
        throw error;

    }
}

const deleteUser = async (id) => {
    try {
        // Eliminar el producto, buscandolo por su idse
        const result = await User.destroy({
            where: { id_usuario: id }
        });

        // Si no se eliminó ningún producto, devolver null
        if (result === 0) {
            return null; // Producto no encontrado o no se eliminó
        }

        return { message: "Usuario eliminado correctamente" }; // Devolver mensaje de éxito
    } catch (error) {
        console.error('Error al recibir los datos:', error);
        throw error;
    }
}

export { allUsers, deleteUser }
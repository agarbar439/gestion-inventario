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

// Funcion para eliminar un usuario
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

// Funcion para actualizar datos de usuario
const modifyUser = async (id, input) => {
    // Actualizar el producto, guardando el numero de columnas actualizadas
    const { updateRows } = await User.update(input, {
        where: { id_usuario: id }
    });

    // Comprobar si hay columnas actualizadas
    if (updateRows === 0) {
        return;
    }

    // Devolver el usuario actualizado
    return await User.findOne({ where: { id_usuario: id } })
}

export { allUsers, deleteUser, modifyUser }
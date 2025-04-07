import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Importamos el modelo User

// Función para crear un nuevo usuario
const createUser = async (nombre, apellidos, nombre_usuario, correo, contrasena, rol) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el usuario con Sequelize
    const user = await User.create({
        nombre,
        apellidos,
        nombre_usuario,
        correo,
        contrasena: hashedPassword,
        rol
    });

    return user;  // Devuelve el usuario creado
};

// Función para verificar un usuario con la contraseña proporcionada
const verifyUser = async (nombre_usuario, contrasena) => {
    try {

        const user = await User.findOne({ where: { nombre_usuario } });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar si la contraseña es correcta comparando la almacenada con la proporcionada
        const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);

        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        return user;  // Devuelve el usuario validado
    } catch (error) {
        throw new Error('Nombre de usuario o contraseña incorrectos');  // Siempre devuelve este mensaje
    }
};




export { createUser, verifyUser };

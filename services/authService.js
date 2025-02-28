/*import connectBBDD from "../config/db.js";

// Funcion para crear usuario
async function createUser(nombre, apellidos, nombre_usuario, correo, contrasena, rol) {
    const connection = await connectBBDD();
    try {
        const [result] = await connection.execute(
            'INSERT INTO usuarios (nombre, apellidos, nombre_usuario, correo, contrasena, rol) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellidos, nombre_usuario, correo, contrasena, rol]
        );
        console.log('Usuario creado con ID:', result.insertId);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
    } finally {
        connection.end();
    }
}

// Exportar el modulo
export default createUser;*/

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';  // Importamos el modelo User

// Función para generar el JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, nombre_usuario: user.nombre_usuario },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }  // Expiración del token (1 hora)
    );
};

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
    const user = await User.findOne({ where: { nombre_usuario } });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar si la contraseña es correcta
    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    return user;  // Devuelve el usuario validado
};

export { generateToken, createUser, verifyUser };

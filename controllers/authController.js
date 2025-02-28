/*import createUser from "../services/authService.js";
import bcrypt from 'bcrypt';
import connectBBDD from "../config/db.js";

// Función para manejar el registro de usuarios
export const signup = async (req, res) => {
    const { nombre, apellidos, nombre_usuario, correo, contrasena, rol } = req.body;

    // Verificar si todos los campos están presentes
    if (!nombre || !apellidos || !nombre_usuario || !correo || !contrasena || !rol) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        // Validar si el usuario ya existe en la base de datos
        const connection = await connectBBDD();
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE nombre_usuario = ? OR correo = ?', [nombre_usuario, correo]);

        if (rows.length > 0) {
            return res.status(400).json({ error: 'El nombre de usuario o el correo ya están en uso' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear el usuario en la base de datos
        const userId = await createUser(nombre, apellidos, nombre_usuario, correo, hashedPassword, rol);

        // Respuesta o redirección
        res.status(201).json({ message: 'Usuario creado con éxito', userId });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const login = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;
    // Validar que los campos no estén vacíos
    if (!nombre_usuario) {
        return res.status(400).json({ error: 'Se debe proporcionar un nombre de usuario.' });
    }

    if (!contrasena) {
        return res.status(400).json({ error: 'Se debe proporcionar una contraseña.' });
    }

    try {
        const connection = await connectBBDD();

        // Buscar el usuario por nombre de usuario o correo
        const [user] = await connection.execute(
            'SELECT * FROM usuarios WHERE nombre_usuario = ? ',
            [nombre_usuario]
        );

        // Verificar si el usuario existe
        if (user.length === 0) {
            return res.status(404).json({ error: 'Nombre de usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isPasswordValid = await bcrypt.compare(contrasena, user[0].contrasena);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Login exitoso
        res.json({ message: 'Login exitoso' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
*/

import { generateToken, createUser, verifyUser } from "../services/authService.js";
import { signupSchema, loginSchema } from "../utils/validation.js";
import { z } from 'zod';

// Función para manejar el registro de usuarios
export const signup = async (req, res) => {
    try {
        // Validar los datos de la solicitud con Zod
        signupSchema.parse(req.body);

        // Obtener los datos de los parámetros
        const { nombre, apellidos, nombre_usuario, correo, contrasena, rol } = req.body;

        // Comprobar que todos los campos esten rellenos
        if (!nombre || !apellidos || !nombre_usuario || !correo || !contrasena || !rol) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }


        // Validar si el usuario ya existe
        const existingUser = await user.findOne({ where: { nombre_usuario } });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        // Crear el nuevo usuario
        const user = await createUser(nombre, apellidos, nombre_usuario, correo, contrasena, rol);

        // Generar el token JWT
        const token = generateToken(user);

        res.status(201).json({ message: 'Usuario creado con éxito', token });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Si la validación de Zod falla, devolver un error de validación
            return res.status(400).json({ error: error.errors[0].message });
        }
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Función para manejar el login de usuarios
export const login = async (req, res) => {
    try {
        // Validar los datos de la solicitud con Zod
        loginSchema.parse(req.body);

        const { nombre_usuario, contrasena } = req.body;

        // Verificar el usuario y la contraseña
        const user = await verifyUser(nombre_usuario, contrasena);

        if (!user) {
            return res.status(401).json({ error: 'Nombre de usuario o contraseña incorrectos.' });
        }

        // Generar el token JWT
        const token = generateToken(user);

        // Enviar el token en la respuesta
        res.status(200).json({ message: 'Login exitoso', token });

    } catch (error) {
        if (error instanceof z.ZodError) {
            // Si la validación de Zod falla, devolver un error de validación
            return res.status(400).json({ error: error.errors[0].message });
        }

        if (error.message === 'Nombre de usuario o contraseña incorrectos') {
            // Manejar el error personalizado de `verifyUser`
            return res.status(401).json({ error: error.message });
        }

        // Error inesperado durante el proceso de login
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

import User from "../models/user.js";
import { createUser, verifyUser } from "../services/authService.js";
import { signupSchema, loginSchema } from "../utils/validation.js";
import { z } from 'zod';
import { generateToken } from "../utils/token.js";

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
        const existingUser = await User.findOne({ where: { nombre_usuario } });
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
        // res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

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

// Obtener rol y nombre_usuario del usuario actual en la sesión
export const getUsuarioInfo = (req, res) => {
    const { id, nombre, apellidos, correo, nombre_usuario, rol } = req.user;

    // Devolver los datos del usuario
    res.status(200).json({ id, nombre, apellidos, correo, nombre_usuario, rol });
}
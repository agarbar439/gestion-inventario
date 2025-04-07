import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import dotenv from 'dotenv';
dotenv.config();

// Middleware para verificar el token JWT y autenticacion
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener solo el token

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Sesión inválida o expirada.' });
        }

        req.user = user;
        console.log("✅ Usuario autenticado:", user.nombre_usuario, "Rol:", user.rol);

        next();
    });
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
    console.log("Middleware isAdmin ejecutado");
    console.log("Usuario en la solicitud:", req.user);

    if (!req.user) {
        console.log("❌ Usuario no autenticado");
        return res.status(401).json({ message: "Usuario no autenticado." });
    }

    console.log("Rol del usuario:", req.user.rol);

    if (req.user.rol !== "administrador") {
        console.log("❌ Usuario sin permisos de administrador");
        return res.status(403).json({ message: "No tienes permisos para acceder a esta página." });
    }

    console.log("✅ Usuario autorizado como administrador");
    next();
};


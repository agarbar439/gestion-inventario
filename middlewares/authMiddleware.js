import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Middleware para verificar el token JWT y autenticacion
export const authenticate = (req, res, next) => {
    // Obtener el token de la cabecera Authorization
    const token = req.headers['authorization']?.split(' ')[1]; // Obtener solo el token

    // Si no se encuentra el token, denegar el acceso
    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado.' });
    }

    // Verificacion del token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Comprobar si el token a expirado o es invalido
        if (err) {
            return res.status(403).json({ error: 'Sesión inválida o expirada.' });
        }

        // Si el token es valido, agregar la informacion del usuario a la solicitud
        req.user = user;

        // Llamar a la siguiente funcion del middleware
        next();
    });
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
    // Verificar si el usuario ha sido autenticDO
    if (!req.user) {
        return res.status(401).json({ message: "Usuario no autenticado." });
    }

    // Verificar si el usuario tiene rol de administrador
    if (req.user.rol !== "administrador") {
        return res.status(403).json({ message: "No tienes permisos para acceder a esta página." });
    }

    next();
};


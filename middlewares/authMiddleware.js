import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import dotenv from 'dotenv';
dotenv.config();

// Middleware para verificar el token JWT
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
        next();
    });
};
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

// Middleware para verificar el token JWT
export const authenticate = (req, res, next) => {
    const token = req.headers['authorization']; // Pasar el token en la cabecera 'Authorization'

    // Comprobar si el token existe, si no, no se puede acceder
    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado.' });
    }

    // Verificar el token
    jwt.verify(token, config, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Sesión inválida o expirada.' });
        }

        // Guardar la información del usuario en el objeto `req` para usarla en las siguientes rutas
        req.user = user;
        next(); // Si el token es válido, continuar con la ejecución del siguiente middleware o ruta
    });
};

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyUser } from '../services/authService.js';

dotenv.config();

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id_usuario,
            nombre: user.nombre,
            apellidos: user.apellidos,
            correo: user.correo,
            nombre_usuario: user.nombre_usuario,
            rol: user.rol,
            iat: Math.floor(Date.now() / 1000)
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const refreshToken = async (req, res) => {
    const cookies = req.cookies;

    // Bad Request
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Check user by token
    // Verificar el usuario y la contraseña
    const user = await verifyUser(nombre_usuario, contrasena);

    if (!user) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH,
        (err, decoded)
    )
}

export { generateToken };

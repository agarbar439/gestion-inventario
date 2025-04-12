import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware

const router = express.Router();
// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta para comprobar que el token es valido
router.get('/api/verifyToken', authenticate, (req, res) => {
    res.status(200).json({ valid: true })
})

// Ruta para manejar el error 404
router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
});

// Ruta para manejar el error 403 (Acceso Denegado)
/*router.use((req, res) => {
    res.status(403).sendFile(path.join(__dirname, '..', 'public', '403.html'));
});*/


export default router;
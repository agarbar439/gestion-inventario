import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware
import path from 'path';  // Importa el módulo 'path'
import { fileURLToPath } from "url";
const router = express.Router();

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta de la pantalla de inicio
router.get('/', authenticate, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default router;
import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware

const router = express.Router();

// Ruta de la pantalla de inicio
router.get('/', authenticate, (req, res) => {
    res.render("index");
});

export default router;
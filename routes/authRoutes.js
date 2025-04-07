import express from 'express';
import path from 'path';  // Importa el módulo 'path'
import { fileURLToPath } from "url";

import { signup, login, getUsuarioInfo } from '../controllers/authController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js'; // Importar el middleware

// Definir __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/usuarios/registrar", authenticate, isAdmin, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/anadir_usuario.html"));
});

// Ruta para manejar la lógica del registro (POST)
// Ruta para registrar usuarios (Solo Admins)
router.post("/usuarios/registrar", authenticate, isAdmin, signup);

// Ruta para obtener la informacion del usuario conectado
router.get("/user", authenticate, getUsuarioInfo);

// Ruta para manejar la lógica del login (POST)
router.post('/login', login); // La función 'login' del controlador


export default router;

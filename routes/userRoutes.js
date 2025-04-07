import { userController } from "../controllers/userController.js";
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js'; // Importar el middleware

import express from 'express';

const router = express.Router();

// Rutas para obtener todos los usuarios
router.get('/users', authenticate, isAdmin, userController.getAllUsers)

// Ruta para eliminar un usuario
router.delete('/users/:id', authenticate, isAdmin, userController.deleteUser)

export default router;
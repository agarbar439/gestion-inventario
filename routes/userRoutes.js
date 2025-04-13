import { userController } from "../controllers/userController.js";
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js'; // Importar el middleware

import express from 'express';

const router = express.Router();

// Rutas para obtener todos los usuarios
router.get('/users', userController.getAllUsers)

// Ruta para eliminar un usuario
router.delete('/users/:id', authenticate, isAdmin, userController.deleteUser)

// Ruta para actualizar un usuario
router.put('/users/:id', userController.updateUser)
export default router;
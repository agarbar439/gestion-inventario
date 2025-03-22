import express from 'express';
import { categoriesController } from '../controllers/categoryController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js'; // Importar el middleware

const router = express.Router();

// Rutas para obtener las categorias
router.get('/categorias', authenticate, isAdmin, categoriesController.getAllCategories)
router.get('/categorias/:id', categoriesController.getCategoriesById)

export default router;
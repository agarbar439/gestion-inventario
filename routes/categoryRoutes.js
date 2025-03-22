import express from 'express';
import { categoriesController } from '../controllers/categoryController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware

const router = express.Router();

// Rutas para obtener las categorias
router.get('/categorias', authenticate, categoriesController.getAllCategories)
router.get('/categorias/:id', authenticate, categoriesController.getCategoriesById)

export default router;
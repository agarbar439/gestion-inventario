import express from 'express';
import { categoriesController } from '../controllers/categoryController.js';

const router = express.Router();


router.get('/categorias', categoriesController.getAllCategories)
router.get('/categorias/:id', categoriesController.getCategoriesById)


export default router;
import express from 'express';
import { productController } from '../controllers/productController.js';

const router = express.Router();

// Rutas para obtener las todos los productos
router.get('/productos', productController.getAllProducts)

// Ruta para obtener productos por id
router.get('/productos/:id', productController.getProductById)

// Ruta para crear un producto
router.post('/productos', productController.createProduct)

export default router;
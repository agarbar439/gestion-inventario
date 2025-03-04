import express from 'express';
import { productController } from '../controllers/productController.js';

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/productos', productController.getAllProducts)

// Ruta para obtener productos por id
router.get('/productos/:id', productController.getProductById)

// Ruta para crear un producto
router.post('/productos', productController.createProduct)

// Ruta para eliminar un producto
router.delete('/productos/:id', productController.deleteProduct)

// Ruta para actualizar un producto
router.put('/productos/:id', productController.updateProduct)

// Ruta para obtener los productos de una categoria
router.get('/productos/categoria/:id', productController.getProductByCategory)

export default router;
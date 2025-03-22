import express from 'express';
import { productController } from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware

const router = express.Router();

// Ruta para obtener todos los productos
router.get('/productos', authenticate, productController.getAllProducts)

// Ruta para obtener productos por id
router.get('/productos/:id', authenticate, productController.getProductById)

// Ruta para crear un producto
router.post('/productos/agregar', authenticate, productController.createProduct)

// Ruta para eliminar un producto
router.delete('/productos/:id', authenticate, productController.deleteProduct)

// Ruta para actualizar un producto
router.put('/productos/:id', authenticate, productController.updateProduct)

// Ruta para obtener los productos de una categoria
router.get('/productos/categoria/:id', productController.getProductByCategory)

export default router;
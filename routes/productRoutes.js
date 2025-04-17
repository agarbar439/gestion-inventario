import express from 'express';
import { productController } from '../controllers/productController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware
import { messageController } from '../controllers/messageController.js';

const router = express.Router();
router.get('/api/mensajes', authenticate, messageController.verMensajes);
router.post('/mensajes', authenticate, messageController.enviarMensaje)

// Ruta para obtener todos los productos (solo autenticados)
router.get('/productos', authenticate, productController.getAllProducts)

// Ruta para obtener productos por ID (solo autenticados)
router.get('/productos/:id', authenticate, productController.getProductById)

// Ruta para crear un producto (solo autenticados)
router.post('/productos/agregar', authenticate, productController.createProduct)

// Ruta para eliminar un producto (solo autenticados)
router.delete('/productos/:id', authenticate, productController.deleteProduct)

// Ruta para actualizar un producto (solo autenticados)
router.put('/productos/:id', authenticate, productController.updateProduct)

// Ruta para obtener productos por categoría (solo autenticados)
router.get('/productos/categoria/:id', authenticate, productController.getProductByCategory)


export default router;
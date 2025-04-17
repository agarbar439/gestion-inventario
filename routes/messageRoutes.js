import express from 'express';
import { messageController } from '../controllers/messageController.js';
import { authenticate } from '../middlewares/authMiddleware.js'; // Importar el middleware

const router = express.Router();

router.get('/api/mensajes', authenticate, messageController.verMensajes);
//router.post('/mensajes', authenticate, messageController.enviarMensaje)


export default router;
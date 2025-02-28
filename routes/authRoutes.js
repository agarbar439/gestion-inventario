import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// Ruta para la vista de signup (GET)
router.get('/signup', (req, res) => {
    res.render('signup');  // Renderiza la vista 'signup.ejs'
});

// Ruta para manejar la lógica del registro (POST)
router.post('/signup', signup);  // La función 'signup' del controlador


// Ruta para manejar la lógica del login (POST)
router.post('/login', login); // La función 'login' del controlador


export default router;

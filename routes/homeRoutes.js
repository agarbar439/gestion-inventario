import express from 'express';

const router = express.Router();

// Ruta de la pantalla de inicio
router.get('/', (req, res) => {
    res.render("index");
});

export default router;
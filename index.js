import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const port = process.env.PORT;
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de vistas
app.set('view engine', 'ejs');

// Usar las rutas de autenticación (login y signup)
app.use(authRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
1
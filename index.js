import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import homeRoutes from './routes/homeRoutes.js';

dotenv.config();

const port = process.env.PORT;
const app = express();

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuración de vistas
app.set('view engine', 'ejs');
app.use(express.static("public")); // Permite servir archivos estáticos desde /public


// Usar las rutas de autenticacion 
app.use(authRoutes);

// Usar la rutas de las categorias
app.use(categoryRoutes)

// Usar las rutas de los productos
app.use(productRoutes)

// Usar la ruta de la pantalla de inicio
app.use(homeRoutes)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
1
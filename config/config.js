import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno

// Configuración de la base de datos mediante variables de entorno
const config = {
    database: 'inventario_supermercado',
    username: 'root',
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: 'mysql',
    secretKey: process.env.SECRET_KEY,
};

export default config;

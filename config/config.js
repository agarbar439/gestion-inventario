import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno

// Configuración de la base de datos mediante variables de entorno
const config = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    secretKey: process.env.JWT_SECRET,
};

export default config;

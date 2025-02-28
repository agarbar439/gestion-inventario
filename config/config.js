import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno

// Configuración de la base de datos mediante variables de entorno
const config = {
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: 'mysql',
};

export default config;

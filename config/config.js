import dotenv from 'dotenv';
dotenv.config();  // Cargar las variables de entorno

// Configuracion de la base de datos mediante variables
const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

// Exportar el modulo
export default config;
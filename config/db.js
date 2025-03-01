/*import mysql from 'mysql2/promise';
import config from './config.js';

// Funcion para crear la conexion de mysql
async function connectBBDD() {
    try {
        const connection = await mysql.createConnection(config); // Crear la conexion con la configuracion de la bbdd
        console.log('Conexión a MySQL establecida.');
        return connection; // Devolver la conexion
    } catch (error) {
        console.error('Error al conectar a MySQL:', error);
        throw error;
    }
}

// Exportar el modulo
export default connectBBDD;*/

import { Sequelize } from 'sequelize';
import config from './config.js';


// Inicialización de Sequelize con la configuración de la base de datos
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false, // Desactivar el log de consultas SQL (opcional)
});

// Verificación de la conexión
async function connectBBDD() {
    try {
        await sequelize.authenticate(); // Verificar la conexión
        console.log('Conexión a la base de datos establecida.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

export { sequelize, connectBBDD };

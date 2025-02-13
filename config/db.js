import mysql from 'mysql2/promise';
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
export default connectBBDD;
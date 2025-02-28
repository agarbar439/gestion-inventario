import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Asegura que el nombre de usuario sea único
        primaryKey: true,  // Establece nombre_usuario como la clave primaria

    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  // Asegura que el correo sea único
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    // Opciones del modelo
    tableName: 'usuarios',
    timestamps: false,
});

export default User;

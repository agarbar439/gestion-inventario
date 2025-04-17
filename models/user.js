import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Representación de la base de datos con sequelize
const User = sequelize.define('User', {
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,

    },
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
        unique: true,

    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
    tableName: 'usuarios',
    timestamps: false,
});

export default User;

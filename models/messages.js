import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './user.js';

const Mensaje = sequelize.define('Mensaje', {
    id_mensaje: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'mensajes',
    timestamps: false,
});

// Definir la relación entre Mensaje y Usuario
Mensaje.belongsTo(User, {
    foreignKey: 'id_usuario',
    as: 'usuario',
});

export default Mensaje;

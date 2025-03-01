import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Configuracion base de datos categorias
const Categories = sequelize.define(
    'Categories',
    {
        // Tablas de la base de datos
        id_categoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: 'categorias',
        timestamps: false,
    }
);

export default Categories;

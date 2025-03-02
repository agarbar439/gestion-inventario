import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Configuracion base de datos productos
const Products = sequelize.define(
    'Products',
    {
        // Tablas de la base de datos
        id_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING,
        },
        id_categoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_compra: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },
        precio_venta: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: 'productos',
        timestamps: false,
    }
);

export default Products;

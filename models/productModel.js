import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Categories from './categoryModel.js';

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
            references: {
                model: Categories, // Indica que hace referencia al modelo Categories
                key: 'id_categoria', // La clave primaria en Categories
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
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


// Definir la relación entre Productos y Categorías
//Indica que cada producto pertenece a una categoría. 
Products.belongsTo(Categories, { foreignKey: 'id_categoria', as: 'categoria' });

//  Indica que una categoría puede tener muchos productos.
Categories.hasMany(Products, { foreignKey: 'id_categoria', as: 'productos' });

export default Products;

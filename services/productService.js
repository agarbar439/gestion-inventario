import Products from "../models/productModel.js";
import Categories from "../models/categoryModel.js";

const productService = {
    // Servicio para listar todas los productos
    async listAllProducts() {
        try {
            // Buscar todos los productos, obteniendo ademas el id y nombre de la categoria
            const products = await Products.findAll({
                include: [{ model: Categories, as: "categoria" }] // Obtener los datos de la categoria
            });
            return products;
        } catch (error) {
            console.error('Error al recibir los datos:', error);
            throw error;
        }
    },

    // Servicio para obtener los productos por id
    async getProductById(id) {
        try {
            // Buscar el producto por la clave primaria pasando el id
            const product = await Products.findByPk(id, {
                include: [{ model: Categories, as: "categoria" }], // Obtener los datos de la categoria
            });

            return product
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            throw error;
        }
    },

    // Servicio para crear un nuevo producto
    async createProduct(input) {
        // Verificar si ya existe un producto con el mismo nombre antes de crearlo
        const existingProduct = await Products.findOne({ where: { nombre: input.nombre } });

        if (existingProduct) {
            throw new Error("Ya existe un producto con este nombre");
        }

        // Si no existe, crear el nuevo producto
        return await Products.create(input);
    },

    // Servicio para eliminar un producto
    async deleteProduct(id) {
        // Eliminar el producto, buscandolo por su idse
        const result = await Products.destroy({
            where: { id_producto: id }
        });

        // Si no se eliminó ningún producto, devolver null
        if (result === 0) {
            return null; // Producto no encontrado o no se eliminó
        }

        return { message: "Producto eliminado correctamente" }; // Devolver mensaje de éxito
    },

    // Servicio para actualizar un producto
    async updateProduct(id, input) {
        // Usar solo los campos que se pueden actualizar
        const fieldsToUpdate = {
            nombre: input.nombre,
            descripcion: input.descripcion,
            id_categoria: input.id_categoria,
            precio_compra: input.precio_compra,
            precio_venta: input.precio_venta,
            stock: input.stock
        };


        // Actualizar el producto, guardando el numero de columnas actualizadas
        const [updatedRows] = await Products.update(fieldsToUpdate, {
            where: { id_producto: id }
        });

        // Comprobar si hay alguna columna actualizada
        if (updatedRows === 0) {
            return;
        }
        // Devolver el producto actualizado
        return await Products.findOne({ where: { id_producto: id } })
    },

    // Servicio para obtener los productos de una categoria
    async getProductsByCategory(id) {
        // Obtener los productos con el id de categoria
        const products = await Products.findAndCountAll({
            where: {
                id_categoria: id
            },
            include: [{ model: Categories, as: "categoria" }], // Obtener los datos de la categoria

        });

        // Devolver los productos
        return products;
    }
}

// Exportar las funciones agrupadas en un solo objeto
export default productService;
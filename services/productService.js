import Products from "../models/productModel.js";
import Categories from "../models/categoryModel.js";

const productService = {
    // Función para listar todas los productos
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

    // Función para obtener los productos por id
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

    // Función para crear un nuevo producto
    async createProduct(input) {
        // Verificar si ya existe un producto con el mismo nombre antes de crearlo
        const existingProduct = await Products.findOne({ where: { nombre: input.nombre } });

        if (existingProduct) {
            throw new Error("Ya existe un producto con este nombre");
        }

        // Si no existe, crear el nuevo producto
        return await Products.create(input);
    }

}
// Exportar las funciones agrupadas en un solo objeto
export default productService;
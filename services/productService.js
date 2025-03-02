import Products from "../models/productModel.js";
import Categories from "../models/categoryModel.js";

const productService = {
    // Función para listar todas los productos
    async listAllProducts() {
        try {
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
            const product = await Products.findByPk(id, {

                include: [{ model: Categories, as: "categoria" }], // Obtener los datos de la categoria

            });
            return product
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            throw error;
        }
    },

}
// Exportar las funciones agrupadas en un solo objeto
export default productService;
import Products from "../models/productModel.js";

const productService = {
    // Función para listar todas los productos
    async listAllProducts() {
        try {
            const products = await Products.findAll();
            return products;
        } catch (error) {
            console.error('Error al recibir los datos:', error);
            throw error;
        }
    },

    // Función para obtener los productos por id
    async getProductById(id) {
        try {
            const product = await Products.findOne({
                where: { id_producto: id },
            });
            return product
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error);
            throw error;
        }
    }

}
// Exportar las funciones agrupadas en un solo objeto
export default productService;
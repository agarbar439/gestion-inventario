import productService from "../services/productService.js";

export class productController {

    // Metodo para obtener todas las productos
    static async getAllProducts(req, res) {
        try {
            const products = await productService.listAllProducts();
            res.status(200).json(products); // Responder con las categorías en formato JSON
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos', error });
        }
    }

    // Metodo para filtar productos por ID
    static async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await productService.getProductById(id)

            if (product) {
                return res.json(product)
            }
            res.status(404).json({ message: 'Producto no encontrado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la categoría', error });
        }
    }


}
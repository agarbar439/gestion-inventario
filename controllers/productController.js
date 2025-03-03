import productService from "../services/productService.js";
import { validateCreateProduct } from "../utils/validation.js";
import { z } from "zod";

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
            res.status(500).json({ message: 'Error al obtener el producto', error });
        }
    }

    // Funcion para crear un nuevo producto
    static async createProduct(req, res) {
        try {
            // Validar los campos con Zod
            const validatedData = validateCreateProduct.parse(req.body);

            // Crear el producto
            const newProduct = await productService.createProduct(validatedData);

            // Devolver el producto creado en json
            res.status(201).json(newProduct);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ error: error.errors });
            }
            res.status(500).json({ message: "Error al crear el producto", error });
        }
    }

}
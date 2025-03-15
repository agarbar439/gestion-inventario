import productService from "../services/productService.js";
import { validateCreateProduct, validateUpdateProduct } from "../utils/validation.js";
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

    // Funcion para eliminar un producto
    static async deleteProduct(req, res) {
        // Obtener el parametro id de la request
        const { id } = req.params;
        try {
            // Almacenar el producto a borrar, buscando por el id
            const deleteProductById = await productService.deleteProduct(id);

            // Si no se encuentra el producto, devolver 404
            if (!deleteProductById) {
                return res.status(404).json({ message: "Producto no encontrado." });
            }

            // Devolver mensaje de éxito
            res.status(200).json({ message: "Producto eliminado correctamente." });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el producto", error });
        }
    }

    // Funcion para actualizar un producto
    static async updateProduct(req, res) {
        const { id } = req.params;
        const updateData = req.body;

        try {
            // Validar solo los campos enviados en la actualización
            const validationResult = validateUpdateProduct.safeParse(updateData);

            if (!validationResult.success) {
                return res.status(400).json({ error: validationResult.error.errors });
            }

            // Llamar al servicio para actualizar el producto
            const updatedProduct = await productService.updateProduct(id, updateData);

            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado." });
            }

            // Devolver el producto
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el producto", error });
        }
    }

    // Funcion para mostrar los productos de una categoria
    static async getProductByCategory(req, res) {
        try {
            const id = Number(req.params.id); // Convertir id a número

            if (isNaN(id) || id <= 0) {
                return res.status(400).json({ message: "ID de categoría no válido." });
            }

            // Llamar al servicio para obtener los productos de la categoria
            const products = await productService.getProductsByCategory(id);

            // Comprobar si no hay productos
            if (products.count === 0) {
                return res.status(404).json({ message: "No hay productos en la categoría." });
            }

            // Devolver los productos en json
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los productos", error: error.message });
        }
    }
}
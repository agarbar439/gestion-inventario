import categoryService from "../services/categoryService.js";

export class categoriesController {

    // Metodo para obtener todas las categorias
    static async getAllCategories(req, res) {
        try {
            // Acceder al nombre de usuario desde req.user
            const username = req.user.nombre_usuario;

            // Obtener las categorías
            const categories = await categoryService.listCategories();

            // Responder con un mensaje personalizado y las categorías
            res.status(200).json({
                mensaje: `Bienvenido, ${username}!`, // Aquí se agrega el nombre del usuario
                categorias: categories // Las categorías que se envían
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las categorías', error });
        }
    }


    // Metodo para obtener categorias por ID
    static async getCategoriesById(req, res) {
        const { id } = req.params;  // Obtener el id de la URL
        try {
            const category = await categoryService.listCategoriesById(id);  // Buscar la categoría por id
            if (category) {
                return res.json(category);  // Si la categoría existe, se devuelve
            }
            res.status(404).json({ message: 'Categoría no encontrada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la categoría', error });
        }
    }
}
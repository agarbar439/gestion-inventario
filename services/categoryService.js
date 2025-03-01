import Categories from "../models/categoryModel.js";

const categoryService = {
    // Función para listar todas las categorías
    async listCategories() {
        try {
            const categories = await Categories.findAll();
            return categories;
        } catch (error) {
            console.error('Error al recibir los datos:', error);
            throw error;
        }
    },

    // Función para listar una categoría por ID
    async listCategoriesById(id) {
        try {
            const category = await Categories.findOne({
                where: { id_categoria: id },
            });
            return category;
        } catch (error) {
            console.error('Error al obtener la categoría por ID:', error);
            throw error;
        }
    },
};

// Exportar las funciones agrupadas en un solo objeto
export default categoryService;
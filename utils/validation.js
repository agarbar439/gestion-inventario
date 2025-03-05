import { z } from 'zod';

// Validaciones del registro de usuarios
export const signupSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    apellidos: z.string().min(1, 'El apellido es obligatorio'),
    nombre_usuario: z.string().min(1, 'El nombre de usuario es obligatorio'),
    correo: z.string().email('El correo debe ser válido'),
    contrasena: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .regex(/[A-Za-z]/, 'La contraseña debe contener letras')
        .regex(/[0-9]/, 'La contraseña debe contener números'),
    rol: z.string().min(1, 'El rol es obligatorio'),
});

// Validaciones de los datos del login
export const loginSchema = z.object({
    nombre_usuario: z.string().min(1, 'El nombre de usuario es obligatorio'),
    contrasena: z.string().min(1, 'La contraseña es obligatoria'),
});

// Validacion crear un nuevo producto
export const validateCreateProduct = z.object({
    nombre: z.string()
        .min(1, "El nombre del producto es obligatorio")
        .regex(/^[a-zA-Z0-9\s]+$/, "El nombre no debe contener caracteres especiales"),

    descripcion: z.string()
        .min(1, "La descripción del producto es obligatoria")
        .regex(/^[a-zA-Z0-9\s]+$/, "La descripción no debe contener caracteres especiales"),

    id_categoria: z.number()
        .int("El ID de categoría debe ser un número entero")
        .positive("El ID de categoría debe ser mayor a 0"),

    precio_compra: z.number()
        .positive("El precio de compra debe ser mayor a 0")
        .refine(value => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
            message: "El precio de compra debe ser un número con máximo 2 decimales"
        }),

    precio_venta: z.number()
        .positive("El precio de venta debe ser mayor a 0")
        .refine(value => /^\d+(\.\d{1,2})?$/.test(value.toString()), {
            message: "El precio de venta debe ser un número con máximo 2 decimales"
        }),

    stock: z.number()
        .int("El stock debe ser un número entero")
        .nonnegative("El stock no puede ser negativo")
});

// Funcion para validar parcialmente (no es necesario tener todos los campos en caso de los update)
export const validateUpdateProduct = validateCreateProduct.partial();


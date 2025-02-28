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

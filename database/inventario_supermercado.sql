-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS inventario_supermercado;
USE inventario_supermercado;

-- Eliminar tablas si existen (orden seguro por claves foráneas)
DROP TABLE IF EXISTS mensajes;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS categorias;

-- Tabla: categorias
CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO categorias (id_categoria, nombre) VALUES
(1, 'Lácteos'),
(2, 'Bebidas'),
(3, 'Carnes'),
(4, 'Frutas'),
(5, 'Panadería'),
(6, 'Verduras');

-- Tabla: usuarios
CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  rol ENUM('administrador', 'empleado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insertar usuarios de prueba
INSERT INTO usuarios (id_usuario, nombre, apellidos, nombre_usuario, contrasena, correo, rol) VALUES
(15, 'antonio', 'garcia', 'antonio', '$2a$10$dIUGuo49/ZiTvug2xQmICeT4kiE59RoWJRpQAU/ECYzlzqW9wJKIi', 'antonio@gmail.com', 'administrador'),
(34, 'prueba12', 'prue', 'prueba12', '$2a$10$wTBClrbmJvePpnnuHf5zk.zXvosrDeeMsf79rs7LrKg/Nse1Tkb7a', 'prueba12@gmail.com', 'empleado'),
(35, 'invitado', 'invitado', 'invitado', '$2a$10$w8Wjev8rCI/YoepPenA.SeDhjAYYOIYcKzLUOxHyxrh.xcq.HPJT6', 'invitado@gmail.com', 'empleado'),
(37, 'admin', 'admin', 'admin', '$2a$10$gzLHCYZhwtz/j.WB5XQc9.iI/m/qWxm2ierOm2HT7YOMejYQaw5gu', 'admin@inventarioapp.es', 'administrador'),
(38, 'user', 'user', 'user', '$2a$10$M6HGp69PNxGqc8Y1Omd2k.usyx0uEXlGQKxBa7baI7oNIJwNx/6rK', 'user@inventarioapp.es', 'empleado');

-- Tabla: productos
CREATE TABLE productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  id_categoria INT NOT NULL,
  precio_compra DECIMAL(10,2) NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO productos (id_producto, nombre, descripcion, id_categoria, precio_compra, precio_venta, stock) VALUES
(1, 'Leche', 'Leche entera 1L', 1, 0.60, 1.20, 30),
(2, 'Yogur Natural', 'Yogur natural 300gr', 1, 0.60, 0.90, 30),
(3, 'Refresco Cola', 'Refresco de cola 2L', 2, 1.00, 1.50, 40),
(5, 'Pechuga de Pollo', 'Pechuga fresca por kg', 3, 5.00, 7.50, 20),
(6, 'Carne Molida', 'Carne molida de res por kg', 3, 4.50, 6.80, 15),
(7, 'Manzanas', 'Manzanas frescas por kg', 4, 2.00, 3.00, 35),
(8, 'Plátanos', 'Plátanos frescos por kg', 4, 1.50, 2.20, 30),
(9, 'Pan Baguette', 'Pan baguette 600gr', 5, 0.77, 1.50, 20),
(10, 'Croissant', 'Croissant de mantequilla', 5, 0.80, 1.20, 15),
(11, 'Yogur de Fresa', 'Yogur de Fresa 500g', 1, 0.70, 1.00, 10),
(50, 'Producto Prueba', 'Producto de prueba', 1, 4.00, 5.06, 446);

-- Tabla: mensajes
CREATE TABLE mensajes (
  id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Ejemplo de mensajes (opcional)
INSERT INTO mensajes (id_usuario, contenido, fecha) VALUES
(15, 'Hola!', '2025-04-17 14:47:13'),
(34, 'Hola 2!', '2025-04-19 14:27:23'),
(35, 'ff', '2025-05-11 16:56:29');


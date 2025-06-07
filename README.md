# 📦 Gestión de Inventario

<aside>
🛠️ Proyecto de Antonio García Barrera
</aside>

---

## 📘 Descripción General

Sistema de Gestión de Inventario: aplicación web que facilita el control y la administración de productos. Permite gestionar productos y categorías, controlar el stock disponible, registrar operaciones de entrada y salida de mercancías, y restringir el acceso a funciones administrativas según el rol del usuario.

Incluye funcionalidades como filtrado productos, chat grupal, autenticación segura y CRUD completo.

---

## ✨ Características Principales

- 🗂️ Gestión de productos y categorías  
- 📉 Control de stock  
- 🔐 Sistema de autenticación con control de roles  
- 💬 Chat entre usuarios  
- 📱 Interfaz moderna y responsiva  

---

## 🎯 Objetivos del Proyecto

1. **Gestionar productos:** Agregar, editar y eliminar productos del inventario.  
2. **Control de stock:** Registrar entradas/salidas actualizando el inventario.  
3. **Categorías:** Organizar productos por tipo.  
4. **Interfaz intuitiva:** Navegación sencilla y rápida.  
5. **Autenticación segura:** Acceso restringido a funciones según el rol del usuario.

---

## ⚙️ Tecnologías Utilizadas

### 🔙 Backend

- **Framework principal:** Express.js  
- **Base de datos:** MySQL + Sequelize ORM  
- **Validación:** Zod  
- **Autenticación:** JWT  
- **Otras funciones:**  
  - API REST  
  - Operaciones CRUD  
  - Middleware de protección  
  - Gestión de usuarios  
  - Chat entre usuarios

### 🎨 Frontend

- **Tecnologías base:** HTML, CSS, JavaScript  
- **Framework CSS:** Bootstrap  
- **Conexión con backend:** Fetch API  

---

## 🧩 Instalación y Puesta en Marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/agarbar439/gestion-inventario
cd gestion-inventario
```
### 2. Instalar dependencias del Backend
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo .env en la raíz del proyecto:
```bash
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña
DB_NAME=inventario_supermercado
PORT=3000
JWT_SECRET=mi_clave_secreta_segura

```
### 4. Importar la base de datos
El archivo SQL está en:
```bash
/database/inventario_supermercado.sql
```
Importar usando consola o gestor gráfico (MySQL Workbench, phpMyAdmin).
```bash
mysql -u tu_usuario -p inventario_supermercado < ./database/inventario_supermercado.sql
```

### 5. Ejecutar el servidor
```bash
npm run dev o node index.js
```
La API se levantará en http://localhost:3000.

### 6. Iniciar la aplicación (Frontend)
Abre frontend/index.html directamente en el navegador

### 7. Acceso con usuarios de prueba
Administrador
Usuario: admin
Contraseña: A12345678

Empleado
Usuario: user
Contraseña: A12345678

### Créditos
Proyecto realizado por Antonio García Barrera
📚 2º DAW – Proyecto Final
🎓 I.E.S. Juan de la Cierva

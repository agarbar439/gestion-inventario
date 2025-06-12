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

### 🛢️ Esquema E/R de la base de datos
![image](https://github.com/user-attachments/assets/15336e5b-fb15-408e-b20b-fb268fd2930d)

---

### Tutorial de Uso de la Aplicación
![tutorial](https://github.com/agarbar439/gestion-inventario/blob/main/public/img/categorias/2025-06-10-1719-47.gif)

---

### 🔗 URL de la aplicación
La aplicación web del sistema de Inventario se encuentra desplegada en el siguiente enlace: https://inventarioapp.es
Para iniciar sesión, se pueden utilizar las siguientes credenciales de acceso:

Usuario: admin
Contraseña: A12345678
(Permisos de administrador)

Usuario: user
Contraseña: A12345678
(Permisos de empleado)

---

### 🖌️ URL del Diseño de la Aplicación
El prototipo de diseño de la aplicación, realizado en Figma, puede consultarse en el siguiente enlace: [Enlace a figma.](https://www.figma.com/design/KpLI0XaBdbyWF80NKSqgpK/Prototipo-Gestion-de-Inventario?node-id=0-1&t=fZ6ypwkgYWts4k8t-1)


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

---
### 8. Bibliografía 
 Bibliografía
Tutoriales / Vídeos
https://www.youtube.com/watch?v=wX9UB0r3HDk 
https://www.youtube.com/watch?v=jkQdEvPf-uI&ab_channel=HaryPhamDev 
https://www.youtube.com/watch?v=V7R0fkCBcq4&ab_channel=midulive 
https://www.youtube.com/watch?v=DxYAcXiy-ak&ab_channel=Mart%C3%ADnGesualdo 
https://www.youtube.com/watch?v=LtB4RR9rj-8 

Documentación oficial
https://sequelize.org/docs/v7/querying/select-methods/ 
https://expressjs.com/en/guide/database-integration.html 
https://www.passportjs.org/concepts/authentication/middleware/ 
https://jwt.io/ 

Blog / Foros
https://platzi.com/tutoriales/1649-passport-2019/9793-guardando-el-jwt-en-una-cookie/ 
https://community.listopro.com/como-conectar-node-js-con-mysql/ 
https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs 
https://www.digitalocean.com/community/tutorials/how-to-use-sequelize-with-node-js-and-mysql 
https://ull-esit-dsi-1617.github.io/estudiar-cookies-y-sessions-en-expressjs-alejandro-raul-35l2-p4/sessionsexpress.html 
https://medium.com/@kimtai.developer/json-web-tokens-jwt-safe-online-and-mobile-authentication-and-authorisation-f3deb7ec2d0e 
https://stackoverflow.com/questions/68557161/set-cookie-with-jwt-nodejs-and-javascript 
http://dev.to/jeanvittory/jwt-refresh-tokens-2g3dv


### Créditos
Proyecto realizado por Antonio García Barrera
📚 2º DAW – Proyecto Final
🎓 I.E.S. Juan de la Cierva

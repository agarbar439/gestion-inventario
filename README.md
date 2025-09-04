# 📦 Inventory Management

<aside>
🛠️ Project by Antonio García Barrera
</aside>

---

## 📘 General Description

Inventory Management System: web application that facilitates product control and administration. It allows you to manage products and categories, control available stock, record goods entry and exit operations, and restrict access to administrative functions according to user role.

It includes features such as product filtering, group chat, secure authentication, and full CRUD.

---

## ✨ Key Features

- 🗂️ Product and category management  
- 📉 Stock control  
- 🔐 Role-based authentication system  
- 💬 Chat between users  
- 📱 Modern and responsive interface  

---

## 🎯 Project Objectives

1. **Manage products:** Add, edit, and remove products from inventory.  
2. **Stock control:** Record entries/exits by updating the inventory.  
3. **Categories:** Organise products by type.  
4. **Intuitive interface:** Simple and fast navigation.  
5. **Secure authentication:** Restricted access to functions based on user role.

---

## ⚙️ Technologies Used

### 🔙 Backend

- **Main framework:** Express.js  
- **Databases:** MySQL + Sequelize ORM  
- **Validation:** Zod  
- **Authentication:** JWT  
- **Other functions:**  
  - API REST  
  - CRUD operations  
  - Protection middleware  
  - User management  
  - Chat between users

### 🎨 Frontend

- **Technologies:** HTML, CSS, JavaScript  
- **Framework CSS:** Bootstrap  
- **Backend connection:** Fetch API  

---

### 🛢️ E/R diagram of the database
![image](https://github.com/user-attachments/assets/15336e5b-fb15-408e-b20b-fb268fd2930d)

---

### Application Tutorial
![tutorial](https://github.com/agarbar439/gestion-inventario/blob/main/public/img/categorias/2025-06-10-1719-47.gif)

---

### 🔗 Application URL
The Inventory System web application can be accessed via the following link: https://inventarioapp.es
To log in, please use the following credentials:

User: admin
Passsword: A12345678
(Admin role)

User: user
Password: A12345678
(Employee role)

---

### 🖌️ Application Design URL
The prototype design of the application, created in Figma, can be viewed at the following link:  [Enlace a figma.](https://www.figma.com/design/KpLI0XaBdbyWF80NKSqgpK/Prototipo-Gestion-de-Inventario?node-id=0-1&t=fZ6ypwkgYWts4k8t-1)


## 🧩 Installation and Start-Up

### 1. Clone the repository

```bash
git clone https://github.com/agarbar439/gestion-inventario
cd gestion-inventario
```
### 2. Install Backend dependencies
```bash
npm install
```

### 3. Configure environment variables
Create .env file at the root of the project:
```bash
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=mysql_password
DB_NAME=inventario_supermercado
PORT=3000
JWT_SECRET=secret key

```
### 4. Import the database
The SQL file is in:
```bash
/database/inventario_supermercado.sql
```
Import using console or graphical manager (MySQL Workbench, phpMyAdmin).
```bash
mysql -u your_user -p inventario_supermercado < ./database/inventario_supermercado.sql
```

### 5. Run the server
```bash
npm run dev o node index.js
```
The API will be launched in http://localhost:3000.

### 6. Start the application (Frontend)
Open localhost:3000/index.html directly in the browser

### 7. Access with test users
Admin role
user: admin
Password: A12345678

Employee role
User: user
Password: A12345678

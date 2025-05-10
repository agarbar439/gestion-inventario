import express from 'express';
import dotenv from 'dotenv'; // Importar dotenv para poder usar variables de entorno desde un archivo .env
import cors from 'cors'; // Permitir peticiones desde otros orígenes (CORS)

// Importar las rutas del sistema
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import errorRoutes from './routes/errorRoutes.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

/* Importaciones para usar Socket.IO */
import { createServer } from "http"; // Para crear el servidor http
import { Server } from "socket.io"; // Importar la clase de Socket.io

dotenv.config(); // Cargar las variables de entorno del archivo .env
const app = express(); // Inicializar la aplicacion

/* Crea el servidor HTTP para WebSocket */
const httpServer = createServer(app);

/* Inicializa el servidor de Socket.IO y lo conecta al servidor HTTP */
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('add user', (username) => {
    io.username = username;
});

// Nuevo mensaje
// when the client emits 'new message', this listens and executes
io.on('new message', (data) => {
    // we tell the client to execute 'new message'
    io.broadcast.emit('new message', {
        username: socket.username,
        message: data
    });
});

// Evento para cuando un nuevo cliente se conecta vía WebSocket
io.on("connection", (socket) => {
    console.log('Usuario conectado:', socket.id);
});

// Inicia el servidor HTTP en el puerto 3000
const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});


// Configura middleware para el servidor Express
app.use(cors());
app.use(express.json());  // Permite parsear JSON en las peticiones
app.use(express.urlencoded({ extended: false })); // Permite parsear datos de formularios

// Configura el motor de vistas para renderizar HTML con EJS
app.set('view engine', 'ejs');

// Permite archivos estáticos (CSS, JS, imágenes) desde la carpeta "public"
app.use(express.static("public"));

// Rutas de autenticación de usuarios (login, registro, etc.)
app.use(authRoutes);

// Rutas relacionadas con las categorías de productos (crear, listar, etc.)
app.use(categoryRoutes)

// Rutas para la gestión de productos
app.use(productRoutes)

// Ruta  pantalla de inicio del sitio
app.use(homeRoutes)

// Rutas relacionadas con usuarios
app.use(userRoutes)

// Rutas para manejar errores 
app.use(errorRoutes)

/*app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
*/
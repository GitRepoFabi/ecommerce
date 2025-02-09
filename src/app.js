import express from 'express';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import routerProducts from './routes/productos.router.js';
import routerCarts from './routes/carts.router.js';
import viewRouter from './routes/viewRouter.js';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';

const puerto = 8080;

/*Configuración Express*/
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Configuración Morgan para monitorear peticiones */
app.use(morgan('tiny'));

/*Ruteo*/
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

/* Configuración para Handlerbars */
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewRouter);

const httpServer = app.listen(puerto, () => console.log(`Servidor escuchando en el puerto ${puerto}`));

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");

    // Cargar los productos desde el archivo productos.json
    fs.readFile(path.join(__dirname, './db/productos.json'), 'utf8', (err, data) => {        
    
        if (err) {
            console.log('Error al leer los productos:', err);
            return;
        }

        const productos = JSON.parse(data);

        // Enviar los productos al cliente
        socket.emit('productos', productos);
    });

    socket.on('agregarUnProducto', (nuevoProducto) => {
        
        const thumbnails = [];
        //Leo los productos del archivo 'Productos.json'
        const productosArchivo = leerProductos();
        const id = productosArchivo.length + 1;

        const productoAgregar = {id, ...nuevoProducto, thumbnails}

        productosArchivo.push(productoAgregar);
        grabarProductos(productosArchivo);
        actualizarProductos();
        //console.log(productoAgregar);
    });

    // Escuchar el evento para eliminar un producto
    socket.on('eliminarProducto', (id) => {
        const productosArchivo = leerProductos();
        const productoEliminado = productosArchivo.filter(producto => producto.id !== id);
        grabarProductos(productoEliminado); //Grabo en el archivo todos los productos menos el seleccionado en la vista

        // Notificar a todos los clientes que los productos han sido actualizados
        io.emit('actualizarProductos', productoEliminado);
    });
});


// Función para leer productos del archivo JSON
const leerProductos = () => {
    const lecturaProductos = path.join(__dirname, './db/productos.json');
    return JSON.parse(fs.readFileSync(lecturaProductos, 'utf-8'));
};

//Función para escribir los nuevos productos en el json
const grabarProductos = (productoGrabar) => {
    const grabar = path.join(__dirname, './db/productos.json');
    fs.writeFileSync(grabar, JSON.stringify(productoGrabar, null, 2));
}

//Funcion para actualizar visuala con nuevos productos
const actualizarProductos = () => {
    const productos = leerProductos();
    io.emit('actualizarProductos',productos);
}
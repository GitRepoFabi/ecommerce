import express from 'express';
import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';


const router = express.Router();

router.get('/', (req,res) => {

    const directorio = path.join(__dirname, './db/productos.json');
    const products = JSON.parse(fs.readFileSync(directorio, 'utf-8'));
    res.render('home', { title:'Productos', products });
});

router.get('/realtimeproducts', (req,res) => {
    res.render('realTimeProducts',{title:'Productos con Websocket'});
/*     Server.emit('hola','hola desde el backend desde la ruta'); */
});

export default router;
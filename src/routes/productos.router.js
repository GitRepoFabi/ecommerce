import { log } from "console";
import { json, Router } from "express";
import { promises as fs} from 'fs';
import { resolve } from "path";

const router = Router();

let id = 0;
let status = true;
let thumbnails = [];

let productos = [];

//GET - Leer todos los productos

router.get('/', async (req,res) => {

    try {
        // Leer el archivo productos.json
        const lecturaProductos = await fs.readFile('src/db/productos.json', 'utf-8');

        // Verificar si el archivo está vacío
        if (!lecturaProductos.trim()) { 
            return res.status(400).send({ status: 'Error', message: 'El archivo productos.json está vacío, cree un producto' }); 
        } 

        //Lo transformo a objeto
        const contenidoObj = JSON.parse(lecturaProductos);

        if (!contenidoObj.length) { 
            return res.status(400).send({ status: 'Error', message: 'No hay productos disponibles' }); 
        } 
        res.send({ status: 'OK', productos: contenidoObj });  
    } catch (error) {
        if (error.code === 'ENOENT') { 
            // El archivo no existe 
            //res.status(404).send({ status: 'Error', message: 'El archivo productos.json no existe' }); }
            res.status(404).send({ status: 'Error', message: 'Debe de crear al menos un producto' }); } 
        else {
            res.status(500).send({ status: 'Error', message: `Error al leer el archivo: ${error.message}` }); 
        } 
    }
});

// Fin método GET //

//GET by Id - Mostrar el producto por el Id que me pasaron

router.get('/:id', async (req,res) => {
    try {

        const id = req.params.id

        // Leer el archivo productos.json
        const lecturaProductos = await fs.readFile('src/db/productos.json', 'utf-8');

        //Lo transformo a objeto
        const contenidoObj = JSON.parse(lecturaProductos);

        const productoFiltrado = contenidoObj.find((pr) => pr.id == id);

        //Si no tengo ningún producto retorno el error
        if(!productoFiltrado){
            return res.status(400).send({status:"Error",message:"No se encuentra el producto enviado"});
        } 

        res.send({status:"OK", productos:productoFiltrado});
        
    } catch (error) {
        throw new Error(`Ha ocurrido un error: ${error}`);
    }
});

//POST - Creación de productos

router.post('/', async (req,res) => {
    
    try {
        const acceso = await fs.access('src/db/productos.json');
        console.log('Existe');

        // Leer el archivo productos.json
        const lecturaProductos = await fs.readFile('src/db/productos.json', 'utf-8');

        //Lo transformo a objeto
        const contenidoObj = JSON.parse(lecturaProductos);

        let id = contenidoObj.length + 1;

        //Me quedo con lo que me envían por el body de la petición
        let body = req.body;

        //Realizo los controles correspondientes con la info que si o si me debe de llegar
        if (!body.titulo||!body.descripión||!body.codigo||!body.precio||!body.stock||!body.categoria){
            return res.status(400).send({status:"Error",error:"Falta completar algún dato"});
        }

        //Armo el nuevo arreglo para luego agregarlo al array de productos
        let nuevoArreglo = {id, ...body,status,thumbnails}

        console.log(JSON.stringify(nuevoArreglo, null, 2));

        //Agrego el nuevo arreglo al arreglo Productos
        productos.push(nuevoArreglo);

        //Persiste la info del arreglo en el archivo productos.json
        await fs.writeFile('src/db/productos.json', JSON.stringify(productos, null, 2));
        //await fs.appendFile('src/db/productos.json', JSON.stringify(productos, null, 2));

        console.log('Se ha agregado el producto correctamente.');

        //Retorno que se agregó el producto y lo muestro por pantalla
        res.send({status:"OK",message:"Se ha agregado el producto correctamente",productos: productos});            

    } catch {
        let id = productos.length + 1;

        //Me quedo con lo que me envían por el body de la petición
        let body = req.body;

        //Realizo los controles correspondientes con la info que si o si me debe de llegar
        if (!body.titulo||!body.descripión||!body.codigo||!body.precio||!body.stock||!body.categoria){
            return res.status(400).send({status:"Error",error:"Falta completar algún dato"});
        }

        //Armo el nuevo arreglo para luego agregarlo al array de productos
        let nuevoArreglo = {id, ...body,status,thumbnails}

        //Agrego el nuevo arreglo al arreglo Productos
        productos.push(nuevoArreglo);

        //Persiste la info del arreglo en el archivo productos.json
        await fs.writeFile('src/db/productos.json', JSON.stringify(productos, null, 2));

        console.log('Se ha agregado el producto correctamente.');

        //Retorno que se agregó el producto y lo muestro por pantalla
        res.send({status:"OK",message:"Se ha agregado el producto correctamente",productos: productos});              
    }
});

// Fin método POST //


//PUT - Edición de pruducto por Id

//Ejemplo actualización de una persona en un archivo (método PUT)
router.put('/:id', async (req,res) => {

    const idParametro = req.params.id;
    const {titulo,descripión,codigo,precio,stock,categoria} = req.body;

    try {
    const productos = await fs.readFile("src/db/productos.json","utf-8");

    const contenidoObj = JSON.parse(productos);

    console.log("Productos inicialmente:",contenidoObj);

    // Encuentra el índice del objeto que deseas actualizar
    let indice = contenidoObj.findIndex(pr => pr.id == idParametro);

    // Verifica si el objeto fue encontrado
    if (indice !== -1) {
        // Actualiza la propiedad deseada
        //contenidoObj[indice].edad = 31;
        contenidoObj[indice].titulo = titulo;
        contenidoObj[indice].descripión = descripión;
        contenidoObj[indice].codigo = codigo;
        contenidoObj[indice].precio = precio;
        contenidoObj[indice].stock = stock;
        contenidoObj[indice].categoria = categoria;
    }

    await fs.writeFile('src/db/productos.json',JSON.stringify(contenidoObj,null,2));

    res.send({status:'OK',message:'Productos finales: ', contenidoObj});
    } catch(error) {
        res.status(500).send({status:'Error',message:'Ha ocurrido un error en la edición del producto:', error});
}
});

// Fin método PUT //

//DELETE - Borrar un producto

router.delete('/:id', async (req,res) => {
    let id = req.params.id;
    
    try {

        // Leer el archivo productos.json
        const lecturaProductos = await fs.readFile('src/db/productos.json', 'utf-8');

        //Lo transformo a objeto
        const contenidoObj = JSON.parse(lecturaProductos);

        let productoFiltrado = contenidoObj.filter(p => p.id != id);


        //Persiste la info del arreglo en el archivo productos.json
        await fs.writeFile('src/db/productos.json', JSON.stringify(productoFiltrado, null, 2));

        res.send({status:'OK',message:"Producto eliminado correctamente", producto: productoFiltrado})

    } catch (error) {
        res.status(500).send({status:'error',message:'Error al eliminar el producto'});
    }

    // Fin método DELETE //
});

export default router;

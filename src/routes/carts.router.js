import { error } from "console";
import { Router } from "express";
import { promises as fs, stat} from 'fs';

const router = Router();
let carrito = [];

//POST - Creación de carrito
router.post('/',async(req,res) => {
    try {
        let id = carrito.length + 1;

        const nuevoCarrito = {
            id,
            products: []
        }
    
        carrito.push(nuevoCarrito);
    
        //Persiste la info del arreglo en el archivo productos.json
        await fs.writeFile('src/db/carrito.json', JSON.stringify(carrito, null, 2));

        res.send({status:"OK",message:"Se ha creado correctamente el carrito",carrito});        
    } catch (error) {
        res.status(500).send({status:"error",message:"Ha ocurrido un error al crear el carrito: ", error});
    }
    
});
// Fin método POST //


//POST - Creación de carrito/productos
router.post('/:cid/products/:pid',async(req,res) => {
    let idCarrito = req.params.cid;
    let idProducto = req.params.pid;
    let cantidad = 0;

    try {
        // Leer el archivo carrito.json
        let carrito = await fs.readFile("src/db/carrito.json","utf-8");
        let producto = await fs.readFile("src/db/productos.json","utf-8");

        //Convierto a objeto el string que me viene arriba
        let contenidoObjCarrito = JSON.parse(carrito);
        let contenidoObjProductos = JSON.parse(producto); 
        
        let indiceCarrito = contenidoObjCarrito.findIndex(carrito => carrito.id == idCarrito);
        let indiceProductos = contenidoObjProductos.findIndex(productos => productos.id == idProducto);

        if (indiceCarrito !== -1 ){
            
            if (indiceProductos !== -1 ) {

                let filtrocarrito = contenidoObjCarrito.find(car => car.id == idCarrito);

                let nuevoProducto = {
                    id: idProducto,
                    cantidad: cantidad + 1
                }

                filtrocarrito.products.push(nuevoProducto)

                await fs.writeFile('src/db/carrito.json',JSON.stringify(filtrocarrito,null,2));

                res.send({status:'OK',message:filtrocarrito});
                
            } else {
                res.send({status:'OK',message:'El producto que envió no existe'})
            }
            

        } else {
            res.send({status:'Error',message:"El carrito que usted envió no existe"});
        }
               
    } catch (error) {
        res.status(500).send("Ha ocurrido un error: ", error);
    }
});

// Fin método POST con producto //

//GET con ID
router.get('/:id',async(req,res) => {
    
    let idParametro = req.params.id;

    try {
        // Leer el archivo carrito.json
        let carrito = await fs.readFile("src/db/carrito.json","utf-8");

        //Convierto a objeto el string que me viene arriba
        let contenidoObj = JSON.parse(carrito);

        //Me quedo con el índice del carrito que coincida con el que viene por parámetro
        let indice = contenidoObj.findIndex(producto => producto.id == idParametro);

        //Encontré el carrito que me pasaron por parámetro
        if (indice !== -1) {

            //Filtro los productos de ese carrito
            let productos = contenidoObj.find(car => car.id == idParametro).products;

            res.send({status:"OK",message:`Productos del carrito ${idParametro}: `, productos});
        } else {
            res.send({status:'Error',message:'No existe el carrito que envió'});
        }
    } catch (error) {
        res.status(500).send({status:'error',message:'Ha ocurrido un error: ', error});
    }
});

// Fin método GET con id //


//Ejemplo actualización de una persona en un archivo (método PUT)
/* router.put('/prueba/:id', async (req,res) => {

    let idParametro = req.params.id;

    let personas = await fs.readFile("src/db/personas.json","utf-8");

    let contenidoObj = JSON.parse(personas);

    console.log("personas inicialmente:",contenidoObj);

    // Encuentra el índice del objeto que deseas actualizar
    let indice = contenidoObj.findIndex(persona => persona.id == idParametro);

    // Verifica si el objeto fue encontrado
    if (indice !== -1) {
        // Actualiza la propiedad deseada
        //contenidoObj[indice].edad = 31;
        contenidoObj[indice].edad = contenidoObj[indice].edad + 1;
        
    }

    await fs.writeFile('src/db/personas.json',JSON.stringify(contenidoObj,null,2));

    console.log("Personas finales: ", contenidoObj);
    res.send({status:'OK',message:'Persona finales: ', contenidoObj})
}); */

export default router;

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

router.post('/:cid/products/:pid', async (req, res) => {
    const idCarrito = req.params.cid;
    const idProducto = req.params.pid;
    //let cantidad = 0;
    let quantity = 0;

    try {
        // Leer los archivos carrito.json y productos.json
        let carrito = await fs.readFile("src/db/carrito.json", "utf-8");
        let producto = await fs.readFile("src/db/productos.json", "utf-8");

        // Convertir el contenido de los archivos en objetos
        let contenidoObjCarrito = JSON.parse(carrito);
        let contenidoObjProductos = JSON.parse(producto);

        // Buscar el carrito y el producto en los arreglos
        let indiceCarrito = contenidoObjCarrito.findIndex(carrito => carrito.id == idCarrito);
        let indiceProductos = contenidoObjProductos.findIndex(productos => productos.id == idProducto);

        if (indiceCarrito !== -1) {
            if (indiceProductos !== -1) {
                // Encontrar el carrito y el producto
                let filtrocarrito = contenidoObjCarrito.find(car => car.id == idCarrito);
                let productoExistente = filtrocarrito.products.find(p => p.id === idProducto);

                if (productoExistente) {
                    // Si el producto ya existe, incrementamos la cantidad
                    //productoExistente.cantidad += 1;
                    productoExistente.quantity += 1;
                } else {
                    // Si el producto no existe en el carrito, lo agregamos
                    let nuevoProducto = {
                        id: idProducto,
                        //cantidad: cantidad + 1
                        quantity: quantity + 1
                    };
                    filtrocarrito.products.push(nuevoProducto);
                }

                // Actualizar el arreglo de carritos completo
                await fs.writeFile('src/db/carrito.json', JSON.stringify(contenidoObjCarrito, null, 2));

                res.send({ status: 'OK', message: filtrocarrito });
            } else {
                res.send({ status: 'Error', message: 'El producto que envió no existe' });
            }
        } else {
            res.send({ status: 'Error', message: 'El carrito que usted envió no existe' });
        }

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error: ', error });
    }
});

// Fin método POST con producto //


//GET con ID
router.get('/:id',async(req,res) => {
    
    const idParametro = req.params.id;

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

export default router;

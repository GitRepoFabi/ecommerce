import { Router } from "express";
import { carsModel } from '../models/cars.model.js';
const router = Router();

//POST - Creación de carrito en BD
router.post('/',async(req,res) => {
    try {
         const nuevoCarrito = await carsModel.create({
            products: []
         });

        res.send({status:"OK",message:"Se ha creado correctamente el carrito",nuevoCarrito});        
    } catch (error) {
        res.status(500).send({status:"error",message:"Ha ocurrido un error al crear el carrito: ", error});
    }
    
});
// Fin método POST //


//POST - Creación de carrito/productos

router.post('/:cid/products/:pid', async (req, res) => {
    const idCarrito = req.params.cid;
    const idProducto = req.params.pid;

    try {
        let carrito = await carsModel.findById(idCarrito);

        // Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.products.find(product => product.product.toString() === idProducto);

        if (productoExistente) {
            // Si el producto ya existe, incremento la cantidad
            productoExistente.quantity += 1;
        } else {
            // Si el producto no existe, lo agrego con la cantidad 1
            carrito.products.push({ product: idProducto, quantity: 1 });
        }

        // Salvo el carrito actualizado
        const actualizarCarrito = await carrito.save();

        res.status(200).send({
            status: 'success',
            message: 'El carrito se ha actualizado correctamente',
            payload: actualizarCarrito
        });

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Ha ocurrido un error: ', error });
    }
});
// Fin método POST con producto //

//GET con ID en BD
router.get('/:id',async(req,res) => {
    const idParametro = req.params.id;
    try {
        //Me trae los datos con el populate incorporado
        const carrito = await carsModel.findById(idParametro).populate('products.product');
        res.send({status:"OK",message:carrito});
    } catch (error) {
        res.status(500).send({status:'error',message:'Ha ocurrido un error: ', error});
    }
});

// Fin método GET con id //

//Método DELETE - Borra los productos de un carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const id_carrito = req.params.cid; 
    const id_producto = req.params.pid;

    try {
        // Buscar el carrito por su ID
        const carrito = await carsModel.findById(id_carrito);

        // Verifico si el carrito que paso por parámetro existe
        if (!carrito) {
            return res.status(404).send({ status: "error", message: "Carrito no encontrado" });
        }

        // Buscar el índice del producto en el array de productos del carrito
        const productIndex = carrito.products.findIndex(p => p.product.toString() === id_producto);

        // Verificar si el producto está en el carrito
        if (productIndex === -1) {
            return res.status(404).send({ status: "error", message: "Producto no encontrado en el carrito" });
        }

        // Eliminar el producto del carrito
        carrito.products.splice(productIndex, 1);

        // Guardar los cambios en la base de datos
        await carrito.save();

        const carritoActualizado = await carsModel.findById(id_carrito).populate('products.product');

        // Responder con el carrito actualizado
        res.send({ status: "success", message: "Producto eliminado del carrito", carritoActualizado });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al eliminar el producto del carrito" });
    }
});

//Método PUT - Actualiza los productos del carrito con un arreglo enviado desde body
router.put('/:cid', async (req, res) => {
    const idCarrito = req.params.cid;
    const { products } = req.body; 
    
    try {
        // Buscar el carrito por su ID
        const carrito = await carsModel.findById(idCarrito);
        
        if (!carrito) {
            return res.status(404).send({ status: "error", message: "Carrito no encontrado" });
        }

        // Reemplazar el arreglo de productos con el nuevo que viene del body
        carrito.products = products.map(product => ({
            product: product.idProducto,
            quantity: product.quantity
        }));

        // Guardar el carrito actualizado
        const actualizarCarrito = await carrito.save();

        res.status(200).send({
            status: 'success',
            message: 'El carrito fue reemplazado correctamente',
            payload: actualizarCarrito
        });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al reemplazar los productos del carrito",
            error: error.message
        });
    }
});

//Fin método PUT


router.put('/:cid/products/:pid', async (req, res) => {
    const idCarrito = req.params.cid;
    const idProducto = req.params.pid
    const { quantity } = req.body; 
    
    try {
        // Buscar el carrito por su ID
        const carrito = await carsModel.findById(idCarrito);
        
        if (!quantity){
            return res.status(404).send({ status: "error", message: "Debes de enviar el parámetro quantity" });
        }

        if (!carrito) {
            return res.status(404).send({ status: "error", message: "Carrito no encontrado" });
        }

        // Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.products.find(product => product.product.toString() === idProducto);

        if (productoExistente) {
            // Si el producto ya existe, incremento la cantidad
            productoExistente.quantity = quantity;
        } else {
          return res.status(404).send({status:"error",message:"Producto no encontrado"});
        }

        // Salvo el carrito actualizado
        const actualizarCarrito = await carrito.save();

        res.status(200).send({
            status: 'success',
            message: 'El carrito se ha actualizado correctamente',
            payload: actualizarCarrito
        });

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error al reemplazar los productos del carrito",
            error: error.message
        });
    }
});

//DELETE - Elimina todos los productos del carrito enviado.
router.delete('/:cid', async (req, res) => {
    const idCarrito = req.params.cid;
    try {
        // Busca el carrito por su ID y vacía la lista de productos
        const carritoActualizado = await carsModel.findByIdAndUpdate(
            idCarrito,
            { $set: { products: [] } },  // Actualiza la propiedad 'products' a un array vacío
            { new: true }  // Devuelve el carrito actualizado
        );

        // Verifica si el carrito existe
        if (!carritoActualizado) {
            return res.status(404).send({ 
                status: "error", 
                message: 'Carrito no encontrado' });
        }

        // Devuelve el carrito actualizado (vacío en la parte de los productos)
        return res.status(200).send({ status: "success", message: "Carrito vacío: ", carritoActualizado });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", message: 'Error al eliminar los productos del carrito' });
    }
});


// Endpoint para obtener los productos de un carrito por su ID
router.get('/detail/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el carrito y poblar los productos
        const cart = await carsModel.findById(id).populate('products.product');

        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Mapear los productos para asegurarnos de que están accesibles para Handlebars
        const products = cart.products.map(item => ({
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
        }));

        // Renderizar la vista Handlebars pasando los productos
        res.render('cart', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
});

export default router;

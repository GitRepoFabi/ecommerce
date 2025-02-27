import express from 'express';
import { productModel } from '../models/products.model.js';
import { carsModel } from '../models/cars.model.js';

const router = express.Router();

let status = true;
let thumbnails = [];


//Metodo GET contra BD

router.get('/:limit?/:page?/:filtro?/:orden?', async (req, res) => {

    try {
        const limite = parseInt(req.params.limit) || 10;   // Si no se pasa limit, por defecto le pongo 10
        const page = parseInt(req.params.page) || 1;        // Si no se pasa page, por defecto le pongo 1
        let filtro = req.params.filtro || '';               // Si no se pasa filtro, muestra todos los productos
        let ordenPrecio = 'price';    // Por defecto se ordena por 'title'
        let orden = req.params.orden || 'asc';      // Por defecto se ordena de forma ascendente

        if(!page) page=1;

        // Si sortOrder es 'desc', cambiarlo a -1 para orden descendente
        orden = orden === 'desc' ? -1 : 1;

        // Crear el objeto de filtro
        let objetoFiltro = {};

        // Si filtro contiene texto (por ejemplo "title:Sillón"), lo parseamos y construimos un objeto de filtro
        if (filtro) {
            
            const parteFiltro = filtro.split(":"); // "title:Sillón" se convierte en ['title', 'Sillón']
            if (parteFiltro.length === 2) {
                const field = parteFiltro[0];  
                const value = parteFiltro[1];
                objetoFiltro[field] = { $regex: value, $options: 'i' };
            }
        }

        console.log("Limite:", limite);
        console.log("Página:", page);
        console.log("Filtro:", objetoFiltro);
        console.log("Orden:", orden);

        // Ejecutar la paginación con el filtro
        const productos = await productModel.paginate(objetoFiltro, {
            page: page,
            limit: limite,
            lean: true,
            sort: { [ordenPrecio]: orden },
        });

        if (limite||page||filtro||orden){
            productos.prevLink = productos.hasPrevPage?`http://localhost:8080/api/productsdb/${limite}/${productos.prevPage}/${filtro}/${orden}`:'',
            productos.nextLink = productos.hasNextPage?`http://localhost:8080/api/productsdb/${limite}/${productos.nextPage}/${filtro}/${orden}`:''
        } else {
            productos.prevLink = productos.hasPrevPage?`http://localhost:8080/api/productsdb/?page=${productos.prevPage}`:'',
            productos.nextLink = productos.hasNextPage?`http://localhost:8080/api/productsdb/?page=${productos.nextPage}`:''
        }
        productos.isValid= !(page<=0||page>productos.totalPages)


        let carrito = await carsModel.findOne({}).sort({ createdAt: -1 });  // O cualquier lógica para obtener el carrito actual
        if (!carrito) {
            carrito = await carsModel.create({ products: [] });
        }

        let carritoId = carrito._id.toString()

        console.log(carritoId)


        // Pasar el carritoId a la vista
        res.render('products_paginate', { 
            ...productos,
            carritoId  // Incluir el ID del carrito en el contexto
        });




/*         let carrito = await carsModel.create({ products: [] });

        let carritoId = carrito._id;
 */
        //res.render('products_paginate',productos);
/*         res.render('products_paginate',{productos,carritoId}); */
        
        console.log(productos); 
        //res.send({ status: "success", paylod: productos });

    } catch (error) {
        console.log("Ha ocurrido un error: ", error);
        res.status(500).send({ status: "error", message: "Error al obtener los productos" });
    }
});

//GET by Id - Mostrar el producto por el Id que me pasaron

router.get('/:id', async (req, res) => {
    try {

        let id = req.params.id

        //let productoFiltrado = arrayRecuperado.find((pr) => pr.id == id);
        let producto = await productModel.findById(id);

        //Si no tengo ningún producto retorno el error
        if (!producto) {
            return res.status(400).send({ status: "Error", message: "No se encuentra el producto enviado" });
        }

        res.send({ status: "success", productos: producto });

    } catch (error) {
        throw new Error(`Ha ocurrido un error: ${error}`);
    }
});

//Metodo POST contra BD
router.post('/', async (req, res) => {
    try {
        //Me quedo con lo que me envían por el body de la petición
        let { title, description, code, price, stock, category } = req.body;

        //Realizo los controles correspondientes con la info que si o si me debe de llegar
        //if (!body.titulo||!body.descripión||!body.codigo||!body.precio||!body.stock||!body.categoria){
        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({ status: "Error", error: "Falta completar algún dato" });
        }

        let productoInsertado = await productModel.create({
            title,
            description,
            code,
            price,
            stock,
            category,
            status,
            thumbnails
        });

        res.send({ status: "Se ha agregado el producto correctamente", payload: productoInsertado });

    } catch (error) {
        res.status(500).send({ status: 'Error', message: 'Ha ocurrido un error en la edición del producto:', error });
    }

});


//PUT - Edición de pruducto por Id contra BD

router.put('/:id', async (req, res) => {

    const idParametro = req.params.id;

    //const {titulo,descripión,codigo,precio,stock,categoria} = req.body;
    const { title, description, code, price, stock, category } = req.body;

    //if (!body.title||!body.description||!body.code||!body.price||!body.stock||!body.category){
    /*     if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({ status: "Error", error: "Falta enviar algua de las propiedades obligatorias para actualizar el producto" });
        } */

    try {

        const productoEditar = await productModel.findById(idParametro);
        if (!productoEditar) {
            return res.status(404).send({ status: 'error', message: 'Producto no encontrado.' });
        }

        productoEditar.title = title || productoEditar.title;
        productoEditar.description = description || productoEditar.description;
        productoEditar.code = code || productoEditar.code;
        productoEditar.price = price || productoEditar.price;
        productoEditar.stock = stock || productoEditar.stock;
        productoEditar.category = category || productoEditar.category;

        const productoActualizado = await productoEditar.save();

        res.send({ status: 'OK', message: 'Producto actualizado satisfactoriamente: ', productoActualizado });
    } catch (error) {
        res.status(500).send({ status: 'Error', message: 'Ha ocurrido un error en la edición del producto:', error });
    }
});

// Fin método PUT //

//DELETE - Borrar un producto por Id contra BD

router.delete('/:id', async (req, res) => {
    let id = req.params.id;

    try {

        const productoEliminar = await productModel.findByIdAndDelete(id);
        if (!productoEliminar) {
            return res.status(404).send({ status: 'error', message: 'Producto no encontrado.' });
        }

        const productos = await productModel.find();

        res.send({ status: 'OK', message: "Producto eliminado correctamente", productos: productos })

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al eliminar el producto' });
    }

    // Fin método DELETE //
});


export default router;
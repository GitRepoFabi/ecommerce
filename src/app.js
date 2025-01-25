import express from 'express';
import routerProducts from './routes/productos.router.js';
import routerCarts from './routes/carts.router.js';

const app = express();

const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : true}));
/* app.use(morgan("tiny")); */

app.use("/api/products",routerProducts);
app.use("/api/carts",routerCarts);

/* //POST - Creación de productos

app.post('/api/products',(req,res) => {

    //Incremento el id en 1
    id = productos.length + 1;

    //Me quedo con lo que me envían por el body de la petición
    let body = req.body;

    //Realizo los controles correspondientes con la info que si o si me debe de llegar
    if (!body.titulo||!body.descripión||!body.codigo||!body.precio||!body.stock||!body.categoria){
        return res.status(400).send({status:"Error",error:"Falta completar algún dato"});
    }

    //Armo el nuevo arreglo para luego agregarlo al array de productos
    let nuevoArreglo = {id, ...body,status}

    productos.push(nuevoArreglo);

    //Persiste la info del arreglo en el archivo productos.json
    const guardarProducto = async () => {
        try {
            await fs.writeFile('./productos.json', JSON.stringify(productos, null, 2));
            console.log('El archivo productos.json ha sido creado exitosamente.');
        } catch (error) {
            throw new Error(`Error durante la operación: ${error.message}`);
        }
    }

    guardarProducto();

    //Retorno que se agregó el producto y lo muestro por pantalla
    res.send({status:"OK",message:"Se ha agregado el producto correctamente",productos: productos});
   
});

// Fin método POST //

//READ - Leer todos los productos

app.get('/api/products',(req,res) => {
    
    const leoProductos = async () => {
        try {
            // Leer el archivo productos.json
            const lecturaProductos = await fs.readFile('./productos.json', 'utf-8');

            //Lo transformo a objeto
            const contenidoObj = JSON.parse(lecturaProductos);

            //Si no tengo ningún producto retorno el error
            if(!contenidoObj){
                return res.status(400).send({status:"error",message:"No se encuentran productos en el archivo"});
            } 

            res.send({status:"OK", productos:contenidoObj});
          
        } catch (error) {
            //throw new Error(`No se pudo leer el archivo productos.json: ${error}`);
            throw new Error(`Ha ocurrido un error: ${error}`);
        }
    }
    leoProductos();
}); */

// Fin método GET //

app.listen(puerto,()=>console.log(`Servidor escuchando en el puerto ${puerto}`));
import mongoose from 'mongoose';
import mongoosePagine from 'mongoose-paginate-v2';

const carsCollection = 'cars'; //Así es como se llamará la colección en nuestra base de datos.

const carsSchema = new mongoose.Schema({

    //Aquí procederemos a escribir todas las propiedades que queremos que tenga un carrito en nuestra BD
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId, //Aplico el link al esquema products
                    ref: "products"
                },
                quantity: Number
            },
        ],
        default: []
    }
});


//Agrego el pluging de paginate: 
carsSchema.plugin(mongoosePagine);

// Ahora, con mongoose.model, generamos el modelo funcional de un carrito conectado a la BD.
export const carsModel = mongoose.model(carsCollection, carsSchema);
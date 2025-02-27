import mongoose  from "mongoose";

//Seteo la variable con la URL de la BD que se va a conectar
const url = "mongodb+srv://Fabian:Fabi$29032025@codercluster.bomhn.mongodb.net/"

export async function connectMongooseDB() {
    try {
        await mongoose.connect(url);
        console.log("Conexión exitosa a MongoDB Atlas");
    } catch (error) {
        console.log("Error al conectar a MongoDB Atlas: ", error);
        process.exit(1);
    }
}

export default mongoose;
import { Collection, MongoClient } from "mongodb";
import { Sensor } from "../interfaces/Sensor";

const url =
  "mongodb+srv://joacomartinez:42303581j@cluster0.6ukrmny.mongodb.net/?retryWrites=true&w=majority";

export let insert = async (base, coleccion, documento) => {
  try {
    let cliente: MongoClient = await MongoClient.connect(url);
    let db = cliente.db(base);
    let collection = db.collection(coleccion);
    let metadata = await collection.insertOne(documento);
    console.log(metadata);
    await cliente.close();
  } catch (err) {
    throw err;
  }
};

export let query = async (base, coleccion, query) => {
  try {
    let cliente: MongoClient = await MongoClient.connect(url);
    let db = cliente.db(base);
    let collection = db.collection(coleccion);
    let resultado = await collection
      .find(query, { projection: { _id: 0 } })
      .toArray();
    await cliente.close();
    return resultado;
  } catch (err) {
    throw err;
  }
};

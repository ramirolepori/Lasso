"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.insert = void 0;
const mongodb_1 = require("mongodb");
const url = "mongodb+srv://joacomartinez:42303581j@cluster0.6ukrmny.mongodb.net/?retryWrites=true&w=majority";
let insert = (base, coleccion, documento) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cliente = yield mongodb_1.MongoClient.connect(url);
        let db = cliente.db(base);
        let collection = db.collection(coleccion);
        let metadata = yield collection.insertOne(documento);
        console.log(metadata);
        yield cliente.close();
    }
    catch (err) {
        throw err;
    }
});
exports.insert = insert;
let query = (base, coleccion, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cliente = yield mongodb_1.MongoClient.connect(url);
        let db = cliente.db(base);
        let collection = db.collection(coleccion);
        let resultado = yield collection
            .find(query, { projection: { _id: 0 } })
            .toArray();
        yield cliente.close();
        return resultado;
    }
    catch (err) {
        throw err;
    }
});
exports.query = query;

import express, { Express } from "express";
import crudSensor from "./Routes/SensorRoute";
import crudUsuario from "./Routes/UsuarioRoute";

let app: Express = express();
app.use(express.json());
app.use(express.static("public"));

app.use(crudSensor);
app.use(crudUsuario);
app.listen(3000);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SensorRoute_1 = __importDefault(require("./Routes/SensorRoute"));
const UsuarioRoute_1 = __importDefault(require("./Routes/UsuarioRoute"));
let app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use(SensorRoute_1.default);
app.use(UsuarioRoute_1.default);
app.listen(3000);

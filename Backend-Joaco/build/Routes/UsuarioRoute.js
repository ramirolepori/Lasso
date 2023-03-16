"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const express_1 = __importDefault(require("express"));
const BDprov_1 = require("../lib/BDprov");
const sha256_1 = __importDefault(require("sha256"));
const uuid_1 = require("uuid");
let crudUsuario = (0, express_1.default)();
crudUsuario.route("/RegistraUsuario").post((req, res) => {
    let contenido = req.body;
    let { id, nombre, apellido, email, contraseña: contraseñaClear, empresa, puesto, } = contenido;
    let salt = [(0, uuid_1.v4)(), (0, uuid_1.v4)()].join("__");
    let contraseña = (0, sha256_1.default)([contraseñaClear, salt].join(""));
    if (validator_1.default.isEmail(email)) {
        let usuGuardar = {
            id,
            nombre,
            apellido,
            email,
            contraseña,
            salt,
            empresa,
            puesto,
        };
        (0, BDprov_1.insert)("Lasso", "Usuarios", usuGuardar)
            .then(() => {
            res.status(201).end();
        })
            .catch(() => {
            res.status(500).end();
        });
    }
    else {
        console.error("El email " +
            email +
            " Debe tener formato del tipo 'emailejemplo@ejemplo.com'");
        res.status(500).end();
    }
});
exports.default = crudUsuario;

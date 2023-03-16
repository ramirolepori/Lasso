"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BDprov_1 = require("../lib/BDprov");
let crudSensor = (0, express_1.Router)();
crudSensor.route("/creaSensor").post((req, res) => {
    let contenido = req.body;
    (0, BDprov_1.insert)("Lasso", "Sensores", contenido)
        .then(() => {
        res.status(201).end();
    })
        .catch(() => {
        res.status(500).end();
    });
});
crudSensor.route("/creaSensorMasivo").post((req, res) => {
    let contenido = req.body;
    let sens;
    for (sens of contenido) {
        (0, BDprov_1.insert)("Lasso", "Sensores", sens)
            .then(() => {
            res.status(201).end();
        })
            .catch(() => {
            res.status(500).end();
        });
    }
});
crudSensor.route("/Sensores").get((req, res) => {
    (0, BDprov_1.query)("Lasso", "Sensores", {})
        .then((data) => {
        if (data.length === 0) {
            res.status(404).end();
            return;
        }
        res.status(200).send(data);
    })
        .catch((err) => res.status(500).end());
});
crudSensor.route("/Sensor/:id").get((req, res) => {
    (0, BDprov_1.query)("Lasso", "Sensores", { idSensor: req.params.id })
        .then((data) => {
        if (data.length === 0) {
            res.status(404).end();
            return;
        }
        res.status(200).send(data[0]);
    })
        .catch((err) => res.status(500).end());
});
exports.default = crudSensor;

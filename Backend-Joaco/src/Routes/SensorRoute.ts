import { Router } from "express";
import { insert, query } from "../lib/BDprov";
import { Sensor } from "../interfaces/Sensor";

let crudSensor = Router();

crudSensor.route("/creaSensor").post((req, res) => {
  let contenido = req.body;
  insert("Lasso", "Sensores", contenido)
    .then(() => {
      res.status(201).end();
    })
    .catch(() => {
      res.status(500).end();
    });
});

crudSensor.route("/creaSensorMasivo").post((req, res) => {
  let contenido: Sensor[] = req.body;
  let sens: Sensor;
  for (sens of contenido) {
    insert("Lasso", "Sensores", sens)
      .then(() => {
        res.status(201).end();
      })
      .catch(() => {
        res.status(500).end();
      });
  }
});

crudSensor.route("/Sensores").get((req, res) => {
  query("Lasso", "Sensores", {})
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
  query("Lasso", "Sensores", { idSensor: req.params.id })
    .then((data) => {
      if (data.length === 0) {
        res.status(404).end();
        return;
      }
      res.status(200).send(data[0]);
    })
    .catch((err) => res.status(500).end());
});

export default crudSensor;
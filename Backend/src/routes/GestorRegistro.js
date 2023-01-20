const { Router, request } = require("express");
const router = Router();
const querys = require("../lib/querys");

router.get("/", async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json(require('../registroGanado.json'))
});

module.exports = router;


/* ESTE CODIGO ES PARA MODIFICAR Y QUE DEVUELVA DE A RANGOS
const { Router, request } = require("express");
const router = Router();
const querys = require("../lib/querys");

//ESTO POR AHORA FUNCIONA PERO NO DEVUELVE EN FUNCION DE UN RANGO DE KEYS
router.get("/", async (req, res) => {
    const start = req.query.start;
    const end = req.query.end;

    const data = require('../registroGanado.json');
    const keys = Object.keys(data);
    const numEntries = keys.length;

    if (isNaN(start) || start >= numEntries || isNaN(end) || end > numEntries) {
        res.status(400).json({ error: 'Invalid range values' });
        return;
    }

    const rangeData = {};
    let count = 0;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (count >= start && count < end) {
            rangeData[key] = data[key];
        }
        count++;
    }
    res.json(rangeData);
});

module.exports = router; */
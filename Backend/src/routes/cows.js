const { Console } = require("console");
const { Router, request } = require("express");
const router = Router();
const querys = require("../lib/querys");


//const _ = require('underscore');

//const data = require('../cows.json');
const data = 0;
console.log(data);

//Cows
router.get("/", async (req, res) => {
  const data1 = await querys.qRequestLake("GET", "cows.json");
  res.header('Access-Control-Allow-Origin', '*');

  res.json(JSON.parse(data1.response));
  
});

router.post("/", (req, res) => {
  const { long, lat, dateTime } = req.body;
  if (long && lat && dateTime) {
    const idSensor = data.length + 1;
    const idCow = data.length + 1;
    const newCow = { ...req.body, idSensor, idCow };
    data.push(newCow);
    res.json(data);
  } else {
    res.status(500).json({ error: "There was an error." });
  }
});

router.put("/:idCow", (req, res) => {
  const { idCow } = req.params;
  const { long, lat, dateTime } = req.body;
  if (long && lat && dateTime) {
    _.each(data, (cow, i) => {
      if (cow.idCow == idCow) {
        cow.idSensor = idSensor;
        cow.long = long;
        cow.lat = lat;
        cow.dateTime = dateTime;
      }
    });
    res.json(data);
  } else {
    res.status(500).json({ error: "There was an error." });
  }
});

router.delete("/:idCow", (req, res) => {
  const { idCow } = req.params;
  _.each(data, (cow, i) => {
    if (cow.idCow == idCow) {
      data.splice(i, 1);
    }
  });
  res.send(data);
});

module.exports = router;

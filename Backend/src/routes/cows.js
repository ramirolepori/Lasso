const { Console } = require("console");
const { Router, request } = require("express");
const router = Router();


//const _ = require('underscore');

//const data = require('../cows.json');

const querys = require("../lib/querys")
console.log('TOKEN:       ' + querys.newToken())
const data = querys.qRequest(
  "GET",
  "https://s3.us-south.cloud-object-storage.appdomain.cloud/data-lake-cos-test/cows.json",
  "json",
    [{'nameHeader': 'Authorization',
    'valueHeader': querys.newToken()}]
    
);


//Cows
router.get("/", (req, res) => {
  res.json(data);
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
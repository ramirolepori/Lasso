const { Router, request } = require('express');
const router = Router();
//const _ = require('underscore');

const data = require('../cows.json');

//Cows
router.get('/', (req, res) => {
    res.json(data);
});

router.post('/', (req, res) => {
    const { long, lat, dateTime } = req.body;
    if (long && lat && dateTime) {
        const idSensor = data.length + 1;
        const idCow = data.length + 1;
        const newCow = { ...req.body, idSensor, idCow };
        data.push(newCow);
        res.json(data);
    }
    else {
        res.status(500).json({ "error": "There was an error." });
    }
});

router.put('/:idCow', (req, res) => {
    const { idCow } = req.params;
    const { long, lat, dateTime } = req.body;
    if (long && lat && dateTime) {
        _.each(data, (cow, i) => {
            if (cow.idCow == idCow) {
                cow.idSensor = idSensor
                cow.long = long;
                cow.lat = lat;
                cow.dateTime = dateTime;
            }
        });
        res.json(data);
    }
    else {
        res.status(500).json({ "error": "There was an error." });
    }
});

router.delete('/:idCow', (req, res) => {
    const { idCow } = req.params;
    _.each(data, (cow, i) => {
        if (cow.idCow == idCow) {
            data.splice(i, 1);
        }
    });
    res.send(data);
})

module.exports = router;




// ID Sensor,ID Vaca,Longitud,Latitud,Fecha/Hora
// 1,1,-62.294199,-31.917103,2022-12-22T12:17:29.784Z
// 2,2,-62.364832,-31.933916,2022-12-22T12:17:29.784Z
// 3,3,-62.331140,-31.890767,2022-12-22T12:17:29.785Z
// 4,4,-62.366658,-31.943480,2022-12-22T12:17:29.785Z
// 5,5,-62.417061,-31.914153,2022-12-22T12:17:29.785Z
// 6,6,-62.309049,-31.950054,2022-12-22T12:17:29.785Z
// 7,7,-62.366427,-31.875639,2022-12-22T12:17:29.785Z
// 8,8,-62.349796,-31.878262,2022-12-22T12:17:29.785Z
// 9,9,-62.363841,-31.857940,2022-12-22T12:17:29.785Z
// 10,10,-62.299626,-31.857174,2022-12-22T12:17:29.785Z
// 1,1,-62.294192,-31.917100,2022-12-22T12:22:29.784Z
// 2,2,-62.364812,-31.933921,2022-12-22T12:22:29.784Z
// 3,3,-62.331121,-31.890789,2022-12-22T12:22:29.785Z
// 4,4,-62.366660,-31.943479,2022-12-22T12:22:29.785Z
// 5,5,-62.417039,-31.914151,2022-12-22T12:22:29.785Z
// 6,6,-62.309055,-31.950064,2022-12-22T12:22:29.785Z
// 7,7,-62.366404,-31.875614,2022-12-22T12:22:29.785Z
// 8,8,-62.349803,-31.878285,2022-12-22T12:22:29.785Z
// 9,9,-62.363834,-31.857951,2022-12-22T12:22:29.785Z
// 10,10,-62.299624,-31.857178,2022-12-22T12:22:29.785Z
// 1,1,-62.294194,-31.917090,2022-12-22T12:27:29.784Z
// 2,2,-62.364789,-31.933928,2022-12-22T12:27:29.784Z
// 3,3,-62.331098,-31.890767,2022-12-22T12:27:29.785Z
// 4,4,-62.366673,-31.943490,2022-12-22T12:27:29.785Z
// 5,5,-62.417047,-31.914135,2022-12-22T12:27:29.785Z
// 6,6,-62.309032,-31.950079,2022-12-22T12:27:29.785Z
// 7,7,-62.366409,-31.875615,2022-12-22T12:27:29.785Z
// 8,8,-62.349812,-31.878308,2022-12-22T12:27:29.785Z
// 9,9,-62.363835,-31.857944,2022-12-22T12:27:29.785Z
// 10,10,-62.299646,-31.857153,2022-12-22T12:27:29.785Z
// 1,1,-62.294201,-31.917107,2022-12-22T12:32:29.784Z
// 2,2,-62.364795,-31.933942,2022-12-22T12:32:29.784Z
// 3,3,-62.331093,-31.890767,2022-12-22T12:32:29.785Z
// 4,4,-62.366676,-31.943465,2022-12-22T12:32:29.785Z
// 5,5,-62.417056,-31.914110,2022-12-22T12:32:29.785Z
// 6,6,-62.309015,-31.950089,2022-12-22T12:32:29.785Z
// 7,7,-62.366419,-31.875622,2022-12-22T12:32:29.785Z
// 8,8,-62.349806,-31.878328,2022-12-22T12:32:29.785Z
// 9,9,-62.363826,-31.857967,2022-12-22T12:32:29.785Z
// 10,10,-62.299629,-31.857159,2022-12-22T12:32:29.785Z
// 1,1,-62.294200,-31.917111,2022-12-22T12:37:29.784Z
// 2,2,-62.364819,-31.933929,2022-12-22T12:37:29.784Z
// 3,3,-62.331080,-31.890749,2022-12-22T12:37:29.785Z
// 4,4,-62.366682,-31.943444,2022-12-22T12:37:29.785Z
// 5,5,-62.417074,-31.914104,2022-12-22T12:37:29.785Z
// 6,6,-62.309003,-31.950090,2022-12-22T12:37:29.785Z
// 7,7,-62.366413,-31.875633,2022-12-22T12:37:29.785Z
// 8,8,-62.349787,-31.878339,2022-12-22T12:37:29.785Z
// 9,9,-62.363806,-31.857986,2022-12-22T12:37:29.785Z
// 10,10,-62.299645,-31.857170,2022-12-22T12:37:29.785Z

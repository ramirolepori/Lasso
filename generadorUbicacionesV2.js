const ObjectsToCsv = require('objects-to-csv');

function generateRandomDecimalInRangeFormatted(min, max, places) {
    let value = Math.random() * (max - min + 1) + min;
    return Number.parseFloat(value).toFixed(places);
}

function editarUbicacion(ub, places) {
    let value = Number(ub) + (Math.random() * (0.000025 + 0.000025) - 0.000025);
    let result = Number.parseFloat(value).toFixed(places);
    return result;
}

function generadorUbicaciones(id_min, id_max) {
    let foo = [];
    let value2 = "";
    let value3 = "";
  
    for (let i = id_min; i <= id_max; i++) {
      currentdate = new Date();
      datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        "-" +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      value2 = generateRandomDecimalInRangeFormatted(-31.835612, -31.952209, 6);
      value3 = generateRandomDecimalInRangeFormatted(-62.272098, -62.472255, 6);
  
      foo.push({
        idSensor: i,
        idVaca: i,
        ubicacionX: value2,
        ubicacionY: value3,
        dataTime: datetime,
      });
    }
    return foo;
}

function nuevaListaUbicaciones(ub){
    let nueva_lista = []
    for (let i = 0; i < ub.length; i++) {
        let nueva_ubicacionX = editarUbicacion(ub[i].ubicacionX, 6);
        let nueva_ubicacionY = editarUbicacion(ub[i].ubicacionY, 6);
        let foo = {
            idSensor: ub[i].idSensor,
            idVaca: ub[i].idVaca,
            ubicacionX: nueva_ubicacionX,
            ubicacionY: nueva_ubicacionY,
            dateTime: datetime,
        }; 
        nueva_lista.push(foo);
    }
    return nueva_lista;
}

let ubicaciones = generadorUbicaciones(10, 20);
let ubicaciones2 = nuevaListaUbicaciones(ubicaciones);

for(let i = 0; i < ubicaciones.length; i++){
    console.log("UbicacionX A: " + ubicaciones[i].ubicacionX + " UbicacionX B: " + ubicaciones2[i].ubicacionX );
    console.log("UbicacionY A: " + ubicaciones[i].ubicacionY + " UbicacionY B: " + ubicaciones2[i].ubicacionY );
}

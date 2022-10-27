const ObjectsToCsv = require('objects-to-csv');

function generateRandomDecimalInRangeFormatted(min, max, places = 6) {
    let value = Math.random() * (max - min + 1) + min;
    return Number.parseFloat(value).toFixed(places);
}

function editarUbicacion(ub, places = 6, min = 0.000025, max = 0.000025) {
    let value = Number(ub) + (Math.random() * (max - min) + min);
    let result = Number.parseFloat(value).toFixed(places);
    return result;
}

function nuevaListaUbicaciones(id_min = 0, id_max = 500,
     lat_min = -31.835612, lat_max = -31.952209,
     lon_min = -62.272098, lon_max = -62.472255) {
    // Genera una lista de ubicaciones aleatorias asociadas a ids.
    // La lista va desde id_min hasta id_max inclusive
    // 
    let foo = [];
    let latitud;
    let longitud;
  
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
      latitud = generateRandomDecimalInRangeFormatted(lat_min, lat_max);
      longitud = generateRandomDecimalInRangeFormatted(lon_min, lon_max);
  
      foo.push({
        idSensor: i,
        idVaca: i,
        ubicacionX: latitud,
        ubicacionY: longitud,
        dataTime: datetime,
      });
    }
    return foo;
}

function modificarListaUbicaciones(ub){
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

let ubicaciones = nuevaListaUbicaciones(10, 20);
let ubicaciones2 = modificarListaUbicaciones(ubicaciones);

for(let i = 0; i < ubicaciones.length; i++){
    console.log("UbicacionX A: " + ubicaciones[i].ubicacionX + " UbicacionX B: " + ubicaciones2[i].ubicacionX );
    console.log("UbicacionY A: " + ubicaciones[i].ubicacionY + " UbicacionY B: " + ubicaciones2[i].ubicacionY );
}

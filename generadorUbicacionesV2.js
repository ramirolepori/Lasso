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
    let lat;
    let lon;
  
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
      lat = generateRandomDecimalInRangeFormatted(lat_min, lat_max);
      lon = generateRandomDecimalInRangeFormatted(lon_min, lon_max);
  
      foo.push({
        idSensor: i,
        idVaca: i,
        latitud: lat,
        longitud: lon,
        dataTime: datetime,
      });
    }
    return foo;
}

function modificarListaUbicaciones(ub){
    let nueva_lista = []
    for (let i = 0; i < ub.length; i++) {
        let nueva_latitud = editarUbicacion(ub[i].latitud);
        let nueva_longitud = editarUbicacion(ub[i].longitud);
        let foo = {
            idSensor: ub[i].idSensor,
            idVaca: ub[i].idVaca,
            latitud: nueva_latitud,
            longitud: nueva_longitud,
            dateTime: datetime,
        }; 
        nueva_lista.push(foo);
    }
    return nueva_lista;
}

let ubicaciones = nuevaListaUbicaciones(10, 20);
let ubicaciones2 = modificarListaUbicaciones(ubicaciones);

for(let i = 0; i < ubicaciones.length; i++){
    console.log("Latitud A: " + ubicaciones[i].latitud + " Latitud B: " + ubicaciones2[i].latitud );
    console.log("Longitud A: " + ubicaciones[i].longitud + " Longitud B: " + ubicaciones2[i].longitud );
}

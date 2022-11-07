const fs = require('fs');
const { exit } = require('process');

function generateRandomDecimalInRangeFormatted(min, max, places = 6) {
    let value = Math.random() * (max - min) + min;
    return Number.parseFloat(value).toFixed(places);
}

function editarUbicacion(ub, places = 6, min = -0.000025, max = 0.000025) {
    /**
     * Genera un nuevo valor de longitud o latitud a partir de un valor base.
     * El valor es modificado por un numero al azar tal que min <= x <= max
     * @param {String|Number} ub           El valor base a modificar
     * @param {Number}        places       La cantidad de decimales del valor a obtener
     */
    let value = Number(ub) + (Math.random() * (max - min) + min);
    let result = Number.parseFloat(value).toFixed(places);
    return result;
}

function obtenerDateTimeFormateado(){
    /**
     * Devuelve una string que representa una fecha en formato dd/mm/aaaa-HH:MM:SS
     * Actualmente no se utiliza
     */
    let currentdate = new Date();
    let dtime =
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
    return dtime
}

function nuevaListaUbicaciones(id_min = 0, id_max = 10,
     lon_min = -62.472255, lon_max = -62.272098,
     lat_min = -31.952209, lat_max = -31.835612) {
    /** 
    * Genera una lista de ubicaciones aleatorias asociadas a ids.
    * @param {int} id_min   Primer id asociado
    * @param {int} id_max   Último id asociado
    */ 
    let foo = [];
    let lat;
    let lon;
  
    for (let i = id_min; i <= id_max; i++) {
        lon = generateRandomDecimalInRangeFormatted(lon_min, lon_max);
        lat = generateRandomDecimalInRangeFormatted(lat_min, lat_max);
        let fecha  = new Date();
        fecha.setHours(fecha.getHours() - 3);  // Restamos 3 horas por el uso horario
        foo.push({
            idSensor: i,
            idVaca: i,
            longitud: lon,
            latitud: lat,
            dateTime: fecha.toISOString(),
        });
    }
    return foo;
}

function modificarListaUbicaciones(ub){
    /**
     * Genera una nueva lista de ubicaciones a partir de una lista existente
     * @param {Array} ub    Lista original
     **/
    let nueva_lista = [];
    for (let i = 0; i < ub.length; i++) {
        let nueva_longitud = editarUbicacion(ub[i].longitud);
        let nueva_latitud = editarUbicacion(ub[i].latitud);
        let anterior_fecha = new Date(ub[i].dateTime);
        // Modificar la siguiente línea para cambiar el intervalo de tiempo
        anterior_fecha.setMinutes(anterior_fecha.getMinutes() + 5);
        let nueva_fecha = anterior_fecha.toISOString();
        let foo = {
            idSensor: ub[i].idSensor,
            idVaca: ub[i].idVaca,
            longitud: nueva_longitud,
            latitud: nueva_latitud,
            dateTime: nueva_fecha,
        }; 
        nueva_lista.push(foo);
    }
    return nueva_lista;
}

function generarUbicaciones(n_listas = 10, n_vacas = 10) {
    /**
     * Genera listas de ubicaciones de vacas.
     * Cada lista describe la ubicacion de cada vaca en un momento determinado.
     * @param {int} n_vacas         Cantidad de vacas
     * @param {int} n_listas        Cantidad de listas
     */
    let ubs = [];
    ubs.push(nuevaListaUbicaciones(1, n_vacas));

    for(let i = 0; i + 1 < n_listas; i++){
        ubs.push(modificarListaUbicaciones(ubs[i]));
    }
    return ubs;
}

function generarCSVString(lista){
    /**
     * Genera un string formateado para CSV a partir de una lista de ubicaciones.
     * @param {Array} lista     La lista a partir de la cual se genera el string
     */
    let csvList = []
    csvList = lista.map(item => [
        item.idSensor,
        item.idVaca,
        item.longitud,
        item.latitud,
        item.dateTime
    ]);
    csvList.unshift([
        "ID Sensor",
        "ID Vaca",
        "Longitud",
        "Latitud",
        "Fecha/Hora"
    ]);

    return csvList.map(item => item.join(","))
           .join("\n");
}

/**
 * Usage: Se debe ejecutar el script con 2 argumentos
 * El primero es la cantidad de ubicaciones a generar por vaca
 * El segundo es la cantidad de vacas
 * 
 * Ejemplo: Si los argumentos son 5 y 10, se generarán 5 listas de ubicaciones
 * de 10 vacas cada una.
 * 
 * 
 * El resultado se guarda en 'test.csv'
 */

if(process.argv.length != 4){
    console.log("Error! Se necesitan 2 argumentos");
    exit();
}
let n_listas = process.argv[2];
let n_vacas = process.argv[3];

let ubicaciones = generarUbicaciones(n_listas, n_vacas);
let lista = [];
for(let i = 0; i < ubicaciones.length; i++){
    // Concatenamos las listas de ubicaciones en una sola lista
    lista = lista.concat(ubicaciones[i]);
}

// console.log(obtenerDateTimeFormateado());


let csvString = generarCSVString(lista);
fs.writeFile('test.csv', csvString, function (err) {
    if (err) throw err;
    console.log('Saved!');
});


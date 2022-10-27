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

function obtenerDateTimeFormateado(){
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
     lat_min = -31.835612, lat_max = -31.952209,
     lon_min = -62.272098, lon_max = -62.472255) {
    /** 
    * Genera una lista de ubicaciones aleatorias asociadas a ids.
    * @param {int} id_min   Primer id asociado
    * @param {int} id_max   Último id asociado
    */ 
    let foo = [];
    let lat;
    let lon;
  
    for (let i = id_min; i <= id_max; i++) {
        lat = generateRandomDecimalInRangeFormatted(lat_min, lat_max);
        lon = generateRandomDecimalInRangeFormatted(lon_min, lon_max);

        foo.push({
            idSensor: i,
            idVaca: i,
            latitud: lat,
            longitud: lon,
            dateTime: obtenerDateTimeFormateado(),
        });
    }
    return foo;
}

function modificarListaUbicaciones(ub){
    /**
     * Genera una nueva lista de ubicaciones a partir de una lista existente
     * @param {Array} ub    Lista original
     *  */
    let nueva_lista = [];
    for (let i = 0; i < ub.length; i++) {
        let nueva_latitud = editarUbicacion(ub[i].latitud);
        let nueva_longitud = editarUbicacion(ub[i].longitud);
        let foo = {
            idSensor: ub[i].idSensor,
            idVaca: ub[i].idVaca,
            latitud: nueva_latitud,
            longitud: nueva_longitud,
            dateTime: obtenerDateTimeFormateado(),
        }; 
        nueva_lista.push(foo);
    }
    return nueva_lista;
}

function generarUbicacionesCSV(n_vacas = 10, n_listas = 10, filename = './test.csv') {
    /**
     * Genera listas de ubicaciones de vacas y las guarda en un .csv
     * @param {int} n_vacas         Cantidad de vacas
     * @param {int} n_listas        Cantidad de listas
     * @param {string} filename     Nombre del archivo destino
     */
    let lista = nuevaListaUbicaciones(1, n_vacas);

    for(let i = 1; i < n_listas; i++){
        (async () => {
            const csv = new ObjectsToCsv(lista);
           
            // Save to file:
            await csv.toDisk(filename, { append: true });
        })();
        lista = modificarListaUbicaciones(lista);
    }
}

generarUbicacionesCSV(10, 5, './test.csv');
const fs = require('fs');

// Lee el archivo .csv
fs.readFile('../Backend/src/registroGanado.csv', 'utf-8', (err, data) => {
    if (err) throw err;

    // Convierte el contenido del archivo .csv a un array de objetos
    const rows = data.split('\n').slice(1);
    const objects = rows.map(row => {
        const columns = row.split(',');
        return {
            idSensor: parseFloat(columns[0]),
            lat: columns[3],
            long: columns[2],
            dateTime: columns[4]
        };
    });

    // Agrupa los objetos por el ID del sensor
    const grouped = objects.reduce((acc, obj) => {
        if (!acc[obj.idSensor]) {
            acc[obj.idSensor] = {
                idSensor: obj.idSensor,
                ubicaciones: [],
                estado: 'sana',
                'fecha-de-alta': obj.dateTime
            };
        }
        acc[obj.idSensor].ubicaciones.push({
            lat: obj.lat,
            long: obj.long,
            dateTime: obj.dateTime
        });
        return acc;
    }, {});

    // Convierte el objeto agrupado a una cadena de texto en formato .json
    const json = JSON.stringify(grouped, null, 2);

    // Escribe el archivo .json
    fs.writeFile('../Backend/src/registroGanado.json', json, 'utf-8', err => {
        if (err) throw err;
        console.log('Archivo .json generado.')
    });
});
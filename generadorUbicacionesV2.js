const ObjectsToCsv = require('objects-to-csv');

function generateRandomDecimalInRangeFormatted(min, max, places) {
    let value = Math.random() * (max - min + 1) + min;
    return Number.parseFloat(value).toFixed(places);
}

function editarUbicacion(ub, places) {
    let value = ub + (Math.random() * (0.000025 + 0.000025) - 0.000025);
    return Number.parseFloat(value).toFixed(places);
}
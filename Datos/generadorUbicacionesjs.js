const ObjectsToCsv = require('objects-to-csv');
let value2 = "";
let value3 = "";
let currentdate = new Date();
let datetime = "";

function generateRandomDecimalInRangeFormatted(min, max, places) {
  let value = Math.random() * (max - min + 1) + min;
  return Number.parseFloat(value).toFixed(places);
}
function editUbicacion(ub, places) {
  let value = ub + (Math.random() * (0.000025 + 0.000025) - 0.000025);
  return Number.parseFloat(value).toFixed(places);
}

function generadorUbicaciones() {
  var foo = [];



  for (let i = 10001; i <= 10500; i++) {
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
      ubicacionY: value2,
      ubicacionX: value3,
      dataTime: datetime,
    });
  }
  return foo;
}
let ubicaciones = [];
ubicaciones.push(generadorUbicaciones());
//console.log(ubicaciones)

for (let i = 0; i <= 10; i++) {
  let foo = [];
  for (let j = 0; j < ubicaciones[i].length; j++) {
    //console.log(ubicaciones[i][j])
    foo.push({
      idSensor: ubicaciones[i][j].idSensor,
      idVaca: ubicaciones[i][j].idVaca,
      ubicacionY: editUbicacion(value2, 6),
      ubicacionX: editUbicacion(value3, 6),
      dataTime: datetime,
    });
  }
  (async () => {
    const csv = new ObjectsToCsv(foo);
   
    // Save to file:
    await csv.toDisk('./test.csv',{append:true});
   
    // Return the CSV file as string:
    //console.log(await csv.toString());
  })();
  ubicaciones.push(foo);
}




function generateRandomDecimalInRangeFormatted(min, max, places) {
  let value = Math.random() * (max - min + 1) + min;
  return Number.parseFloat(value).toFixed(places);
}
function editUbicacion(ub, places) {
  let value = ub + Math.random() * (0.000025 + 0.000025) - 0.000025;
  return Number.parseFloat(value).toFixed(places);
}

function generadorUbicaciones() {
  var foo = [];

  let value2 = "";
  let value3 = "";

  for (var i = 10001; i <= 10500; i++) {
    var currentdate = new Date();
    var datetime =
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
var ubicaciones = [];
ubicaciones.push(generadorUbicaciones());

for (var i = 0; i <= 10; i++) {
  var foo = [];
  for (var j = 0; j <= ubicaciones[i].length; j++) {
    foo.push({
      idSensor: ubicaciones[i][j].idSensor,
      idVaca: ubicaciones[i][j].idVaca,
      ubicacionY: editUbicacion(value2, 6),
      ubicacionX: editUbicacion(value3, 6),
      dataTime: datetime,
    });
  }
  ubicaciones.push(foo);
}

msg.payload = "{" + foo.toString() + "}";
return msg;

let map;
var marcadores = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -31.90030, lng: -62.38222 },
    zoom: 12,
    // Establecemos el tipo de mapa a vista de satélite
    mapTypeId: 'hybrid' // Utiliza la vista de satelite con labels activados
  });
  // Set mouseover event for each feature.
  map.data.addListener("click", (event) => {
    document.getElementById("info-box").textContent =
      event.feature.getProperty("place");
  });
  // Agregamos el listener para el evento "idle"
  map.addListener("idle", () => {
    // Llamamos a la función que carga y procesa el archivo JSON
    cargarDatosJSON();
    //agruparMarcadores();
  });
  map.addListener("click", () => {
    for (var i = 0; i < marcadores.length; i++) {  //I assume you have your infoboxes in some array
      marcadores[i].InfoWindow.close();
    }
  })
}

//Seccion para cargar los marcadores en el mapa en funcion al json////////////////////
function cargarDatosJSON() {
  // Crea una nueva instancia de XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Abre una nueva solicitud HTTP GET hacia el archivo JSON
  xhr.open("GET", "../Datos/registroGanado.json");
  // Especifica qué hacer cuando se recibe la respuesta del servidor
  xhr.onload = function () {
    // Si la solicitud fue exitosa (código HTTP 200)
    if (xhr.status === 200) {
      // Parsea el contenido de la respuesta como un objeto JavaScript
      const datos = JSON.parse(xhr.responseText);
      marcadores = [];
      // Recorre cada entrada del objeto y crea una fila en la tabla con sus valores
      for (const key in datos) {
        const entrada = datos[key];
        const marcador = new google.maps.Marker({
          position: { lat: parseFloat(entrada.ubicaciones[entrada.ubicaciones.length - 1].lat), lng: parseFloat(entrada.ubicaciones[entrada.ubicaciones.length - 1].long) },          
          map: map,
          title: `Sensor ${entrada.idSensor}`
        });
        marcador.addListener("click", () => {
          const infoWindow = new google.maps.InfoWindow({
            content: "",
            disableAutoPan: true,
          });
          const fechaHora = entrada.ubicaciones[entrada.ubicaciones.length - 1].dateTime;
          const fechaFormateada = new Date(fechaHora).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          infoWindow.setContent(`Sensor ${entrada.idSensor} <br> Ultima posición conocida: ${fechaFormateada}`);
          infoWindow.open(map, marcador);
        });
        marcadores.push(marcador);
      }
      // Options to pass along to the marker clusterer
      const clusterOptions = {
        imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
        //imagePath: 'Assets/Resources/cluster-icon.png',
        gridSize: 50,
        zoomOnClick: true,
        maxZoom: 30,
        minimumClusterSize: 3,
      };
      const marcadoresCluster = new MarkerClusterer(map, marcadores, clusterOptions);
      // Change styles after cluster is created
      const styles = marcadoresCluster.getStyles();
      for (let i = 0; i < styles.length; i++) {
        styles[i].textColor = "black";
        styles[i].textSize = 18;
      }
    }
  };
  // Envía la solicitud
  xhr.send();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Defines the callback function referenced in the jsonp file.
function eqfeed_callback(data) {
  map.data.addGeoJson(data);
}

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;

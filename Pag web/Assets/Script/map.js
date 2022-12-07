let map;
/*
function iniciarMap() {
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: coord,
  });
  var marker = new google.maps.Marker({
    position: coord,
    map: map,
  });
  var marker = new google.maps.Marker({
    position: { lat: -34.5966145, lng: -58.4421949 },
    map: map,
  });
  var marker = new google.maps.Marker({
    position: { lat: -33.5966145, lng: -58.4421949 },
    map: map,
  });
}*/

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -31.922505819799284, lng: -62.4630576720368 },
    zoom: 15,
  });

  var marker = new google.maps.Marker({
    position: { lat: -31.924381688239954, lng: -62.46537510080521 },
    map: map,
  });
  var marker = new google.maps.Marker({
    position: { lat: -31.922232631922736, lng: -62.45983902142931 },
    map: map,
  });
  var marker = new google.maps.Marker({
    position: { lat: -31.918735754990795, lng: -62.46322933360525 },
    map: map,
  });


  // Set mouseover event for each feature.
  map.data.addListener("click", (event) => {
    document.getElementById("info-box").textContent =
      event.feature.getProperty("place");
  });
}

// Defines the callback function referenced in the jsonp file.
function eqfeed_callback(data) {
  map.data.addGeoJson(data);
}

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;

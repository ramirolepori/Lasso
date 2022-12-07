let map;

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
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20, lng: -160 },
    zoom: 2,
  });

  // Get the earthquake data (JSONP format)
  // This feed is a copy from the USGS feed, you can find the originals here:
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
  const script = document.createElement("script");

  script.setAttribute(
    "src",
    "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json"
  );
  document.getElementsByTagName("head")[0].appendChild(script);

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

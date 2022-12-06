let map;

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
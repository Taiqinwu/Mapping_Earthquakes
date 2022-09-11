console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([30, 30], 2)
// An alternative to using the setView()method
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 4,
    layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);

// Accessing the airport GeoJSON URL
// Go to where the json file located, and click raw. Copy the link here:
let airportData = "https://raw.githubusercontent.com/Taiqinwu/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        // We turn each feature into a marker on the map.
        onEachFeature: function(feature, layer) {
          console.log(layer);
          layer.bindPopup("<h4>Airport Code: " + feature.properties.faa + "<h4> <hr> Airport name: " + feature.properties.name + "</h4>");
        }
    }).addTo(map);
})
// Create a map object

var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 3
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: "pk.eyJ1IjoiYW1vaHQ4IiwiYSI6ImNqejBpcGJpbTAxYnIzaW40NGZrNWM3aDUifQ.1im8M0DrVvSN9DRvRaKH4w"
  }).addTo(myMap);

  
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


earthquakes = [];

d3.json(url, function(data) {

    for (var i = 0; i < data.features.length; i++) {

        // Conditionals for countries points
        var color = "";
        if (data.features[i].properties.mag > 5) {
          color = "red";
        }
        else if (data.features[i].properties.mag > 4) {
          color = "orange";
        }
        else if (data.features[i].properties.mag > 3) {
          color = "yellow";
        }
        else if (data.features[i].properties.mag > 2){
            color = "green";
        }
        else {
          color = "blue";
        }  
  

 earthquakes.push(L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]],  {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: data.features[i].properties.mag * 5000
          }).bindPopup("<h2>" + data.features[i].properties.place + "</h2> <hr> <h3>" + data.features[i].properties.time + "</h3>").addTo(myMap));

        }
    }
    );
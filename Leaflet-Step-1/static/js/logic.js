    // Create Map fuction for Earthquakes
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var backmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    }); 

     // Create a baseMaps object to hold the backmap layer
    var baseMaps = {
        "Background Map": backmap
    };

    // Create an overlayMaps object to hold the Earthquake layer
  var overlayMaps = {
    "Earthquakes": earthquakes
     };

     // Create the map object with options
     var map = L.map("mapid", {
      center: [33.2559, -116.3750],
      zoom: 12, 
      layers: [backmap, earthquakes]
     });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
        }).addTo(map);
 }

 function createMarkers(response) {

    // Pull the "locations" property off of response.data
    var locations = response.data.stations;
  
    // Initialize an array to hold Earthquakes markers
    var earthMarkers = [];

    // Loop through the Earthquake locations array
  for (var index = 0; index < locations.length; index++) {
    var location = locations[index];

    // For each location, create a marker and bind a popup with the location's name
    var quakeMarker = L.marker([location.lat, location.lon])
      .bindPopup("<h3>" + location.name + "<h3><h3>Magnitude: " + location.magnitude + "</h3>");

      
    // Add the marker to the earthMarkers array
    earthMarkers.push(quakeMarker);
  }

  // Create a layer group made from the Earthquake markers array, pass it into the createMap function
  createMap(L.layerGroup(earthMarkers));

}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);



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
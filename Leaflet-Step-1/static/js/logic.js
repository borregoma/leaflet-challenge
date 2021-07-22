function createMap(earthQuakes) {
    

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
       maxZoom: 18,
       id: "light-v10",
       accessToken: API_KEY
    }); 

    
     // Create a baseMaps object to hold the backmap layer
     var baseMaps = {
        "Background Map": lightmap
    };

    // Create an overlayMaps object to hold the Earthquake layer
    var overlayMaps = {
        "Earthquakes": earthQuakes
    };


    // Create Map 
    var map = L.map("mapid", {
        center: [39, -105],
        zoom: 2,
        layers: [lightmap,earthQuakes]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map

    L.control.layers(baseMaps, overlayMaps, {
       collapsed: false
    }).addTo(map);
}

function createMarkers(response) {

      //  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

    // Pull the "locations" property off of response.data
        var features = response.features;

     // Initialize an array to hold Earthquakes markers

        var quakesArray = [];

    // Loop through the Earthquake locations array
    // For each location, create a marker and bind a popup with the location's name

        for (var i=0; i < features.lenght; i++){
            var feature = features [i];
            var property = feature.properties.place;
            var geometry = feature.geometry.coordinates;
            var mag = feature.properties.mag;
            var id = feature.properties.id;
            var type = feature.geometry.type;
            var quakeMarker = L.circleMarker([geometry[0], geometry[1]], {
                fillOpacy: .5,
                weight: .5,
                color: "orange",
                fillColor: quakeMarkerColor(geometry[2]),
                radius: (mag * 5)
            }).bindPopup(`<h1>${id}</h1><hr><h3>Location: ${property}</h3><hr><h3>Magnitude: ${mag}</h3>`);

     // Add the marker to the quakesArray array
            quakesArray.push(quakeMarker);
        }

  // Create a layer group made from the Earthquake markers array, pass it into the createMap function
  createMap(L.layerGroup(quakesArray));     

}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);
  

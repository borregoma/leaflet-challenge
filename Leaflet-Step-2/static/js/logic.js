 // Create Map fuction for Earthquakes
 function createMap(earthQuakes) {

    // Create the tile layer that will be the background of our map
    var backmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      maxZoom: 18,
      id: "mapbox/streets-v11",
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
      center: [0, 0],
      zoom: 2, 
      layers: [backmap, earthquakes]
    }).addTo(map);

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
 }

// function createMarkers(response) {

    // Pull the "locations" property off of response.data
//    var Feature = response.data.Feature;
  
    // Initialize an array to hold Earthquakes markers
//    var earthMarkers = [];

    // Loop through the Earthquake locations array
//  for (var index = 0; index < Feature.length; index++) {
//    var location = Feature[index];

    // For each location, create a marker and bind a popup with the location's name
//    var quakeMarker = L.marker([location.coordinates])
//      .bindPopup("<h3>" + location.place + "<h3><h3>Magnitude: " + location.mag + "<h3><h3>ID: " + location.ids +"</h3>");

      
    // Add the marker to the earthMarkers array
//    earthMarkers.push(quakeMarker);
//  }

  // Create a layer group made from the Earthquake markers array, pass it into the createMap function
//  createMap(L.layerGroup(earthMarkers));

//}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
//d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);



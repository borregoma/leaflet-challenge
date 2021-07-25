 // define some variables in the global scope
var w = 0 // chart width
, h = 0 // chart height
, chart = d3.select("#chart") // save a selection for the chart
, svg = chart.append("svg") // save a selection for the svg within the chart
// topojson file containing the country boundaries for the world
, worldBoundariesURL = "https://raw.githubusercontent.com/Ryshackleton/json_resources/master/world-topo-min.json"
// json feed for earthquake data: all earthquakes past week:
//, earthquakesJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// json feed for earthquake data: all earthquakes past day:
, earthquakesJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var buildEarthquakeMap = function() {

// width / height of svg in pixels
w = document.getElementById('chart').clientWidth;
h = document.getElementById('chart').clientHeight;

var projection = d3.geo.mercator()
    .scale((w - 1) / 2 / Math.PI)
    .translate([w/2, h/2]);

// size the svg appropriately
svg.attr({
    width: w,
    height: h
  });

// Draw the world map boundaries
d3.json(worldBoundariesURL, function(err,world) {
  if (err) {
    throw err;
  }

  // draw the earthquakes
  // first, make a color scale for the earthquakes
  // from: http://colorbrewer2.org/?type=sequential&scheme=OrRd&n=9
  // one range color for reach domain value
   var eqColorScale = d3.scale.linear()
             .domain([-1, 0, 1, 2, 3, 4, 5, 6, 9 ])
             .range(['#fff7ec','#fee8c8',
                   '#fdd49e','#fdbb84',
                   '#fc8d59','#ef6548',
                   '#d7301f','#b30000','#7f0000']);  
  
  d3.json(earthquakesJSON, function(err, json) {
    if (err) {
      throw err
    }
  
    // Filter out incomplete data
    var earthquakes = json.features.filter(
      function(d) {
        return d.geometry !== null;
      }
    );
    
    // get the circle selection and add the data
    var circles = svg.selectAll("circle")
      .data(earthquakes);
    
    // on the enter selection, add x,y, radius, and color
    circles.enter()
      .append("circle")
      .attr("cx", function(d) {
            return projection(d.geometry.coordinates)[0];
          })
      .attr("cy", function(d) {
            return projection(d.geometry.coordinates)[1];
          })
      .attr("r", 0)
      .transition()
      .duration(1000)
      .delay(function(d,i){ return 200*i; })
      .ease('elastic')
      .attr("r", function(d) {
            return d.properties.mag;
          })
      .style("fill", function(d) {
              return eqColorScale(d.properties.mag);
          })
      .attr("class", "earthquake");
    
    // remove any exit selection
    circles.exit().remove();
  });  
  
  var path = d3.geo.path()
    .projection(projection);

  svg.selectAll("path")
    .data(topojson.feature(world,
                           world.objects.countries).features)
    .enter()
    .append("path")
    .attr("class", "countries")
    .attr("d", path);
  });   
}

var buildMap = function() {
// CREATE MAP
// set view to Seattle Area 
var map = new L.map('theMap').setView([47.598877, -122.330916], 5);

// background tile layer from: https://leaflet-extras.github.io/leaflet-providers/preview/
var Esri_OceanBasemap =  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
  maxZoom: 13
}).addTo(map);
}

var update = function() {
buildEarthquakeMap();
//  buildMap();
};

window.addEventListener("resize", update);

update();

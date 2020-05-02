var width = 900,
    height = 600;

var svg = d3.select('#map').append('svg')
    .attr('width', width)
    .attr('height', height);

var projection = d3.geo.mercator()
    .scale(10000)
    .center([8.226692, 46.80121])
    .translate([width/2, height/2]);

var path = d3.geo.path()
    .projection(projection);

d3.json('data/ch_municipalities.geojson', function(error, features) {

    // We add a <g> element to the SVG element and give it a class to
    // style it later.
    svg.append('g')
        .attr('class', 'features')
        // D3 wants us to select the (non-existing) path objects first ...
        .selectAll('path')
        // ... and then enter the data. For each feature, a <path> element
        // is added.
        .data(features.features)
        .enter().append('path')
        // As "d" attribute, we set the path of the feature.
        .attr('d', path);

});
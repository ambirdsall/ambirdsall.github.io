// based off https://gist.github.com/tenderlove/5898231
var w = 433*0.75;
var h = 300*0.75;
var padding = 10;
var page = d3.select(window);

var xScale = d3.scale.linear()
               .domain([0, w])
               .range([padding, w - padding]);

var yScale = d3.scale.linear()
               .domain([0, w])
               .range([padding, w - padding]);

var dataset = [[w, h], [0, h], [w / 2, 0]];
var triangle = dataset.slice(0);

//Create SVG element
var svg = d3.select(".name-wrap")
      .insert("svg", ".name")
      .attr("width", w)
      .attr("height", h)
      .classed("triangle", true);

function draw(dataset) {
  var circles = svg.selectAll("circle").data(dataset);

  //Create circles
  circles.enter()
         .append("circle")
         .attr("cx", function(d) { return xScale(d[0]); })
         .attr("cy", function(d) { return yScale(d[1]); })
         .attr("r", 1)
         .style("fill", "#aa9668");
}

function genpoint(triangle, point) {
  var vertex = triangle[Math.floor(Math.random() * triangle.length)];
  var x = (vertex[0] + point[0]) / 2;
  var y = (vertex[1] + point[1]) / 2;
  return [x, y];
}

function addNewPoints() {
  for (var i = 0; i < 15; i++) {
    point = genpoint(triangle, point);
    dataset.push(point);
  }
  draw(dataset);
}

var point = [w / 2, h / 2];
dataset.push(point);

page.on("mousemove", addNewPoints);
page.on("deviceorientation", addNewPoints);
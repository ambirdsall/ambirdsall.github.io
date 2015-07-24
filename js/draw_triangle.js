// Draws a sierpinski triangle in response to scrolling events,
// using the chaos game algorithm: a good rundown can be found (where else)
// in wikipedia: https://en.wikipedia.org/wiki/Sierpinski_triangle#Chaos_game
// Once the triangle has been drawn, further scrolling is captured to scroll
// the page's central div, which is the only bit that moves. The idea is to
// look rad without undue scrolljacking.
// 
// A quick google search turned up a simple implementation by Aaron Patterson,
// which I adapted to my own purposes. The original lives (or lived, as of this
// writing) at https://gist.github.com/tenderlove/5898231

var w = 433*0.75,
    h = 300*0.75,
    padding = 10,
    page = d3.select(window),
    // Create SVG element in which to draw triangle
    svg = d3.select("#triangle")
            .insert("svg", ".name")
            .attr("width", w)
            .attr("height", h)
            .classed("triangle", true),

    // d3 selections are nested arrays, as: [[node]]
    scrollingContainer = d3.select("#scrollable")[0][0],

    xScale = d3.scale.linear()
                     .domain([0, w])
                     .range([padding, w - padding]),
    yScale = d3.scale.linear()
                     .domain([0, w])
                     .range([padding, w - padding]),

    // start with the three vertices of the triangle
    dataset = [[0, 0], [w, 0], [w / 2, h]],
    triangle = dataset.slice(0);

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

function buildTriangle() {
  // d3.event.preventDefault();
  for (var i = 0; i < 444; ++i) {
    point = genpoint(triangle, point);
    dataset.push(point);
  }
  draw(dataset);
}

function buildThenScrollWheel() {
  d3.event.preventDefault();

  if (dataset.length < 11111) {
    buildTriangle();
  } else {
    scrollingContainer.scrollTop += d3.event.deltaY;
  }
}

// On a touchscreen, it is way more natural to touch in the center, rather than
// the top or bottom: so I don't think it's as important to support scrolling
// the scrollingContainer from outside it.
function buildThenScrollTouch() {
  d3.event.preventDefault();

  if (dataset.length < 11111) {
    buildTriangle();
  } else {
    page.on("touchmove", null);
  }
}

function buildThenScrollKeydown() {
  if (keys[d3.event.keyCode]) {
    d3.event.preventDefault();

    if (dataset.length < 11111) {
      for (var i = 0; i < 3; ++i) {
        buildTriangle();
      }
    } else {
      scrollingContainer.scrollTop += keys[d3.event.keyCode];
    }
  }
}

// Seed the triangle with a starting point in the middle
var point = [w / 2, h / 2];
dataset.push(point);

/*=============================*
 * Load up the event handlers! *
 *=============================*/
var keys = {
  38: -40,    // up 40px like normal (except Firefox??)
  40: 40,     // down 40px (v.s.)
  34: true,   // page down, ?px
  32: true,   // spacebar, same as page down
  33: true,   // page up
  35: true,   // end key
}

page.on("wheel", buildThenScrollWheel);
page.on("touchmove", buildThenScrollTouch);
page.on("mousewheel", buildThenScrollWheel); // TODO: test this out.
page.on("keydown", buildThenScrollKeydown);

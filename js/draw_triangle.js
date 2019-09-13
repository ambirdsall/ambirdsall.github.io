// https://en.wikipedia.org/wiki/Sierpinski_triangle#Chaos_game
// https://gist.github.com/tenderlove/5898231

export default function triangleBuilder(scale, selector, color) {
  var w = 433 * scale,
      h = 300 * scale,
      padding = 10,
      page = d3.select(window),
      // Create SVG element in which to draw triangle
      svg = d3.select(selector)
              .insert("svg", ".name")
              .attr("width", w)
              .attr("height", h)
              .classed("triangle", true),

      xScale = d3.scale.linear()
                      .domain([0, w])
                      .range([padding, w - padding]),
      yScale = d3.scale.linear()
                      .domain([0, w])
                      .range([padding, w - padding]),

      // start with the three vertices of the triangle
      dataset = [[0, 0], [w, 0], [w / 2, h]],
      triangle = dataset.slice(0),

      // Seed the triangle with a starting point in the middle
      point = [w / 2, h / 2]
  dataset.push(point)


  function draw(dataset) {
    var circles = svg.selectAll("circle").data(dataset)

    //Create circles
    circles.enter()
      .append("circle")
      .attr("cx", function(d) { return xScale(d[0]); })
      .attr("cy", function(d) { return yScale(d[1]); })
      .attr("r", 1)
      .style("fill", color)
  }

  function genpoint(triangle, point) {
    var vertex = triangle[Math.floor(Math.random() * triangle.length)]
    var x = (vertex[0] + point[0]) / 2
    var y = (vertex[1] + point[1]) / 2
    return [x, y]
  }

  return function buildGivenTriangle() {
    for (var i = 0; i < 8; ++i) {
      point = genpoint(triangle, point)
      dataset.push(point)
    }
    draw(dataset)
  }
}
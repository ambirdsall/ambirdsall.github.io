// https://en.wikipedia.org/wiki/Sierpinski_triangle#Chaos_game
// https://gist.github.com/tenderlove/5898231

export function triangleBuilder(scale, selector, color) {
  const w = 433 * scale
  const h = 300 * scale
  const padding = 10
  const page = d3.select(window)
  // Create SVG element in which to draw triangle
  const svg = d3.select(selector)
                .insert("svg", ".name")
                .attr("width", w)
                .attr("height", h)
                .classed("triangle", true)

  const xScale = d3.scale.linear()
                         .domain([0, w])
                         .range([padding, w - padding])
  const yScale = d3 .scale.linear()
                          .domain([0, w])
                          .range([padding, w - padding])

  // start with the three vertices of the triangle
  const dataset = [[0, 0], [w, 0], [w / 2, h]]
  const triangle = dataset.slice(0)

  // Seed the triangle with a starting point in the middle
  const point = [w / 2, h / 2]
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

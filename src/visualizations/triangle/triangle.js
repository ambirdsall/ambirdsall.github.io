import { select, scaleLinear } from "d3"

import { Point, halfwayBetween, sample } from "./utils"

export default class Triangle {
  constructor(el) {
    const w = 433 * 0.5
    const h = 300 * 0.5
    const padding = 10

    this.svg = select(el)
      .insert("svg", ".name")
      .attr("width", w)
      .attr("height", h)
      .classed("triangle", true)
      .style("justify-self", "center")

    this.x = scaleLinear()
      .domain([0, w])
      .range([padding, w - padding])
    this.y = scaleLinear()
      .domain([0, w])
      .range([padding, w - padding])

    // start with the three vertices of the triangle
    this.vertices = [Point(0, 0), Point(w, 0), Point(w / 2, h)]
    this.points = [...this.vertices]

    // Seed the triangle with a starting point in the middle
    this.current = Point(w / 2, h / 2)
    this.points.push(this.current)
  }

  draw() {
    this.svg
      .selectAll("circle")
      .data(this.points)
      .enter()
      .append("circle")
      .attr("cx", d => this.x(d.x))
      .attr("cy", d => this.y(d.y))
      .attr("r", 1)
      .style("fill", "#aa9668")
  }

  next() {
    const previousPoint = this.current
    const randomVertex = sample(this.vertices)
    this.current = halfwayBetween(previousPoint, randomVertex)
    this.points.push(this.current)
  }

  buildGivenTriangle(stepSize) {
    // Why 8? I did a little manual testing and 8 circles per mousemove event
    // felt like right speed to populate the triangle
    for (var i = 0; i < stepSize; ++i) this.next()
    this.draw()
  }

  run() {
    const timer = setInterval(() => {
      if (this.points.length > 8888) clearInterval(timer)

      this.buildGivenTriangle(11)
    }, 10)
  }
}

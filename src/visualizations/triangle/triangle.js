import { select, scaleLinear, interval } from "d3"

import { Point, halfwayPoint, sample, Ring } from "./utils"

export default class Triangle {
  constructor(el) {
    const w = 433 * 0.5
    const h = 300 * 0.5
    const padding = 10

    /* DATA SETUP */
    // start with the three vertices of the triangle
    this.vertices = [Point(0, 0), Point(w, 0), Point(w / 2, h)]

    // the const reference exists apart from the property so that it can be
    // passed to the input update function without messing with its `this` value
    const points = new Ring([...this.vertices])
    this.points = points

    // Seed the triangle with a starting point in the middle
    this.current = Point(w / 2, h / 2)
    this.points.push(this.current)

    /* VISUALIZATION SETUP */
    this.svg = select(el)
      .insert("svg", ".name")
      .attr("width", w)
      .attr("height", h)
      .classed("triangle", true)
      .style("justify-self", "center")
      .style("margin", "auto")

    this.resizer = select(el)
      .insert("input")
      .attr("type", "range")
      .style("justify-self", "center")
      .style("width", "216.5px")
      .style("margin", "30px auto -10px")
      .on("input", function() {
        points.resize(+this.value)
      })

    this.x = scaleLinear()
      .domain([0, w])
      .range([padding, w - padding])
    this.y = scaleLinear()
      .domain([0, w])
      .range([padding, w - padding])
  }

  update() {
    const circles = this.svg.selectAll("circle").data(this.points.data)
    circles.exit().remove()

    circles
      .enter()
      .append("circle")
      .attr("r", 1)
      .style("fill", "#aa9668")

    circles.attr("cx", d => this.x(d.x)).attr("cy", d => this.y(d.y))
  }

  next() {
    const previousPoint = this.current
    const randomVertex = sample(this.vertices)
    this.current = halfwayPoint(previousPoint, randomVertex)
    this.points.push(this.current)
  }

  drawSomeDots(stepSize) {
    // Why 8? I did a little manual testing and 8 circles per mousemove event
    // felt like right speed to populate the triangle
    for (var i = 0; i < stepSize; ++i) this.next()
    this.update()
  }

  run() {
    interval(() => {
      // if (this.points.length > 8888) clearInterval(timer)

      this.drawSomeDots(11)
    }, 10)
  }
}

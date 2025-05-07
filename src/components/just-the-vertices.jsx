import { select, scaleLinear } from "d3"

import { Point, Ring } from "./utils"

export default class Vertices {
  #el
  #w = 433 * 0.5
  #h = 300 * 0.5
  #maxSize = 2000
  #minSize = 1

  constructor(el) {
    this.#el = el
    this.initPoints()
    this.initVisualization()
  }

  initPoints() {
    this.vertices = [
      Point(this.#w, this.#h),
      Point(0, this.#h),
      Point(this.#w / 2, 0),
    ]

    this.points = new Ring([...this.vertices], {
      maxSize: this.#maxSize,
      minSize: this.#minSize,
    })

    // Seed the triangle with a starting point in the middle
    this.current = Point(this.#w / 2, this.#h / 2)
    this.points.push(this.current)
  }

  initVisualization() {
    const padding = 10

    this.svg = select(this.#el)
      .insert("svg", ".name")
      .attr("width", this.#w)
      .attr("height", this.#h)
      .attr("style", "background: white")

    this.x = scaleLinear()
      .domain([0, this.#w])
      .range([padding, this.#w - padding])
    this.y = scaleLinear()
      .domain([0, this.#w])
      .range([padding, this.#w - padding])
  }

  update() {
    const circles = this.svg.selectAll("circle").data(this.points.data)
    circles.exit().remove()

    circles
      .enter()
      .append("circle")
      .attr("r", 2)
      .style("fill", "#aa9668")

    circles.attr("cx", d => this.x(d.x)).attr("cy", d => this.y(d.y))
  }
}

import { select, scaleLinear } from "d3"

import { Point, halfwayPoint, sample, Ring } from "./utils"

export default class Triangle {
  #el
  #w = 433 * 0.5
  #h = 300 * 0.5
  #maxSize = 10000
  #minSize = 60
  #activeMaxSize = this.#maxSize

  constructor(el) {
    this.#el = el
    this.initPoints()
    this.initVisualization()
    this.update()

    this.points.resize(this.#maxSize)
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
      .attr("r", 1)
      .style("fill", "#aa9668")

    circles.attr("cx", d => this.x(d.x)).attr("cy", d => this.y(d.y))
  }

  addNextPoint() {
    const previousPoint = this.current
    const randomVertex = sample(this.vertices)
    this.current = halfwayPoint(previousPoint, randomVertex)
    this.points.push(this.current)
  }

  drawSomeDots(n) {
    for (let i = 0; i < n; ++i) this.addNextPoint()
    this.update()
  }

  run() {
    this.drawSomeDots(10000)
    this.update()
  }
}

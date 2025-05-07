import { select, scaleLinear, interval } from "d3"

import { Point, halfwayPoint, sample, Ring } from "./utils"

export default class Triangle {
  #el
  #w = 433 * 0.5
  #h = 300 * 0.5
  #startingSliderValue = 18
  #maxSize = 2000
  #minSize = 60
  #activeMaxSize = this.#maxSize

  constructor(el) {
    this.#el = el
    this.initPoints()
    this.initVisualization()

    this.points.resize(this.#startingSliderValue)
    this.resize(this.#startingSliderValue)
  }

  initPoints() {
    this.vertices = [
      Point(0, 0),
      Point(this.#w, 0),
      Point(this.#w / 2, this.#h),
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
    // capture a reference which can be used with another `this`
    const resize = this.resize
    // another `this`
    function onSliderInput() {
      resize(+this.value)
    }

    this.svg = select(this.#el)
      .insert("svg", ".name")
      .attr("width", this.#w)
      .attr("height", this.#h)

    const sliderContainer = select(this.#el)
      .insert("div")
      .attr("class", "resizer")
      .style("margin-top", "2em")

    this.sliderLabel = sliderContainer
      .insert("label")
      .attr("for", "triangle-point-selector")
      .style("display", "block")
      .style("text-align", "center")
      .style("color", "rgba(170, 150, 104, 1)")

    sliderContainer
      .insert("input")
      .attr("type", "range")
      .attr("id", "triangle-point-selector")
      .style("justify-self", "center")
      .style("width", "216.5px")
      .attr("value", `${this.#startingSliderValue}`)
      .on("input", onSliderInput)
      .append("span")
      .text(function() {
        return this.value
      })

    this.x = scaleLinear()
      .domain([0, this.#w])
      .range([padding, this.#w - padding])
    this.y = scaleLinear()
      .domain([0, this.#w])
      .range([padding, this.#w - padding])
  }

  resize = percent => {
    const newMax = (percent / 100) * this.#maxSize
    this.#activeMaxSize = this.points.safeMax(newMax)
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

    this.sliderLabel.html(
      () => `<i>Number of points:</i> ${this.points.length()}`
    )
  }

  addNextPoint() {
    const previousPoint = this.current
    const randomVertex = sample(this.vertices)
    this.current = halfwayPoint(previousPoint, randomVertex)
    this.points.push(this.current)
  }

  drawSomeDots(stepSize) {
    this.correctSizeBy(stepSize)
    for (let i = 0; i < stepSize; ++i) this.addNextPoint()
    this.update()
  }

  correctSizeBy(stepSize) {
    const delta = this.#activeMaxSize - this.points.maxSize
    if (delta > 0) {
      // #activeMaxSize is bigger, grow this.points.maxSize
      // ...but not too much
      const safeChange = Math.min(stepSize, delta)

      this.points.resizeBy(safeChange)
    } else if (delta < 0) {
      // #activeMaxSize is smaller, shrink this.points.maxSize
      // ...but not too much
      const safeChange = 0 - Math.min(stepSize, 0 - delta)

      this.points.resizeBy(safeChange)
    }
  }

  run() {
    interval(() => this.drawSomeDots(11), 10)
  }
}

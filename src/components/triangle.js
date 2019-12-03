import React, { useRef, useEffect } from "react"
import { select, scaleLinear } from "d3"

export default function Triangle() {
  // get a ref so d3 can have a persistent reference to the DOM node it's
  // mounted on
  const el = useRef(null)

  // put el.current in the dependency array of a useEffect whose callback
  // contains the d3 code, so it will run when the ref is assigned to an actual
  // DOM node
  useEffect(function() {
    const w = 433 * 0.5
    const h = 300 * 0.5
    const padding = 10
    const page = select(window)
    const svg = select(el.current)
          .insert("svg", ".name")
          .attr("width", w)
          .attr("height", h)
          .classed("triangle", true)
          .style("justify-self", "center")

    const xScale = scaleLinear()
          .domain([0, w])
          .range([padding, w - padding])
    const yScale = scaleLinear()
          .domain([0, w])
          .range([padding, w - padding])
// debugger
    // start with the three vertices of the triangle
    const dataset = [[0, 0], [w, 0], [w / 2, h]]
    const triangle = dataset.slice(0)

    // Seed the triangle with a starting point in the middle
    // I know it's ugly, but imperatively resetting/reusing the point based on
    // itself is the easy way to implement the algorithm
    let point = [w / 2, h / 2]
    dataset.push(point)

    function draw(dataset) {
      var circles = svg.selectAll("circle").data(dataset)

      circles.enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d[0]); })
        .attr("cy", function(d) { return yScale(d[1]); })
        .attr("r", 1)
        .style("fill", "#aa9668")
    }

    function genpoint(triangle, previousPoint) {
      var vertex = triangle[Math.floor(Math.random() * triangle.length)]
      var x = (vertex[0] + previousPoint[0]) / 2
      var y = (vertex[1] + previousPoint[1]) / 2
      return [x, y]
    }

    function buildGivenTriangle(stepSize) {
      // Why 8? I did a little manual testing and 8 circles per mousemove event
      // felt like right speed to populate the triangle
      for (var i = 0; i < stepSize; ++i) {
        point = genpoint(triangle, point)
        dataset.push(point)
      }
      draw(dataset)
    }

    const timer = setInterval(() => {
      if (dataset.length > 8888) clearInterval(timer)

      buildGivenTriangle(11)
    }, 10)
  }, [])

  return <div ref={el} style={{
    display: "flex",
    justifyContent: "center",
    margin: "3em 0"
  }} />
}

import React from "react"
import D3Wrapper from "./d3wrapper"
import Vertices from "../visualizations/triangle/just-the-vertices"

const drawVertices = el => {
  const v = new Vertices(el)
  v.update()
  v.update()
}

const VerticesWrapper = () => (
  <D3Wrapper d3RenderFn={drawVertices} className="triangle big-bottom" />
)

export default VerticesWrapper

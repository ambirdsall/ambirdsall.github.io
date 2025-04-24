import React from "react"
import D3Wrapper from "./d3wrapper"
import StaticTriangle from "./viz/static-triangle"

import "./triangle.css"

const d3Triangle = el => {
  new StaticTriangle(el).run()
}

const TriangleWrapper = () => (
  <D3Wrapper d3RenderFn={d3Triangle} className="triangle big-bottom" />
)

export default TriangleWrapper

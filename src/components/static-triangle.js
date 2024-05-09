import React, { useCallback } from "react"
import D3Wrapper from "./d3wrapper"
import StaticTriangle from "../visualizations/triangle/static-triangle"

import "./triangle.css"

export default function TriangleWrapper() {
  const d3Triangle = useCallback(el => {
    new StaticTriangle(el).run()
  }, [])

  return <D3Wrapper d3RenderFn={d3Triangle} className="triangle" />
}

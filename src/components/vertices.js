import React, { useCallback } from "react"
import D3Wrapper from "./d3wrapper"
import Vertices from "../visualizations/triangle/just-the-vertices"

export default function VerticesWrapper() {
  const drawVertices = useCallback(el => {
    const v = new Vertices(el)
    v.update()
    v.update()
  }, [])

  return <D3Wrapper d3RenderFn={drawVertices} className="triangle" />
}

import React, { useRef, useEffect } from "react"
import Triangle from "../visualizations/triangle/triangle"

export default function TriangleWrapper() {
  // d3 needs an actual DOM node to do its thing on, so let's give it one
  const el = useRef(null)

  useEffect(() => {
    new Triangle(el.current).run()
  }, [])

  return (
    <div
      ref={el}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "3em 0",
      }}
    />
  )
}

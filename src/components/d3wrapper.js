import React, { useRef, useEffect } from "react"

export default function D3Wrapper({ d3RenderFn, className }) {
  // d3 needs an actual DOM node to do its thing on, so let's give it one
  const el = useRef(null)

  useEffect(() => {
    d3RenderFn(el.current)
  }, [d3RenderFn])

  return <div className={className} ref={el} />
}

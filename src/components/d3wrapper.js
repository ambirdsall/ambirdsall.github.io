import React, { useRef, useEffect } from "react"

export default function D3Wrapper({ d3RenderFn, className }) {
  // d3 needs an actual DOM node to do its thing on, so let's give it one
  const el = useRef(null)

  // Render the d3 visualization. If the d3 visualization is already in the DOM, though,
  // do not recreate it; this avoids duplicated element shenanigans with hot module
  // reloading during development.
  useEffect(() => {
    if (!window.d3Embeds) {
      window.d3Embeds = new Map()
    }

    if (!window.d3Embeds.get(d3RenderFn)) {
      d3RenderFn(el.current)
      window.d3Embeds.set(d3RenderFn, true)
    }
  }, [d3RenderFn])

  return <div className={className} ref={el} />
}

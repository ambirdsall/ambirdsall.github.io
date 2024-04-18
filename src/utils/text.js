import React from "react"

// The "P" is for "Paragraphed".
// Renders a bunch of text, wrapping each blank-line-separated text segment
// in a <p> tag.
//
// It has a fatal flaw: it doesn't gracefully handle inline components, so its
// contents must be entirely plain text. If you want to use any <Aside>s, you
// need to manually wrap their containing paragraph of text in a <p>.
export function P({ children }) {
  const paragraphed = child =>
    typeof child === "string"
      ? child.split(/,,/).map((s, index) => <p key={index}>{s}</p>)
      : child

  return (
    <>
      {typeof children === "string"
        ? paragraphed(children)
        : children.map(paragraphed)}
    </>
  )
}

export function Section({ children }) {
  const id = children.replace(/ /g, "-").replace(/[^a-zA-Z\d-]/g, "")
  const anchor = `#${id}`

  return (
    <h3 id={id}>
      {children}
      <a className="section__title" href={anchor}>
        §
      </a>
    </h3>
  )
}

export function Aside({ children }) {
  return (
    <>
      <span className="sidenote__mark">*</span>
      <span className="sidenote">{children}</span>
    </>
  )
}

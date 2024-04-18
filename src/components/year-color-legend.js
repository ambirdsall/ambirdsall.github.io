import React from "react"
import numberToColor from "../utils/number-to-color"

const y = year => (
  <span style={{ color: numberToColor(year) }} key={year}>
    {year}
  </span>
)
const lastFewYears = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  .map(n => new Date().getFullYear() - n)
  .map(year => y(year))
  .reduce((ys, y) => (
    <>
      {ys} | {y}
    </>
  ))

export default function Legend() {
  return <p style={{ textAlign: "center" }}>({lastFewYears})</p>
}

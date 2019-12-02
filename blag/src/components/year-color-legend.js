import React from "react"
import numberToColor from "../utils/number-to-color"

const y = year => <span style={{color: numberToColor(year)}}>{year}</span>

export default function Legend() {
  return <p style={{textAlign: "center"}}>
    ({y(2019)} | {y(2018)} | {y(2017)} | {y(2016)})
  </p>
}

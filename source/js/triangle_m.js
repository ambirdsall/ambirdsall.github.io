import buildTriangle from './draw_triangle.js'
import { curry } from 'lodash-es'

var page = d3.select(window)
page.on("mousemove",    buildTriangle)
page.on("devicemotion", buildTriangle)

var addOne = curry(function add(a,b) { return a+b })(1)

console.log(addOne(2))

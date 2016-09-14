import triangleBuilder from './draw_triangle.js'
import setIntervalX from './interval_n_times.js'
// import { once } from 'lodash-es'

var populateMainTriangle = triangleBuilder(0.5, '#triangle',  "#aa9668")
var populateMiniTriangle = triangleBuilder(0.3, '#mini-triangle', '#224466')

var page = d3.select(window)
page.on("mousemove",    populateMainTriangle)
page.on("devicemotion", populateMainTriangle)
page.on('load', () => { setIntervalX(populateMiniTriangle, 20, 200) })

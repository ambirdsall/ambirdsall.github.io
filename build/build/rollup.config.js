import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'source/js/triangle_m.js'
, dest: 'source/js/triangle_b.js'
, format: 'iife'
, sourceMap: 'inline'
, plugins: [
    resolve({
      jsnext: true
    , main: true
    , browser: true
    })
  , commonjs({
    exclude: 'node_modules/lodash-es/**'
  })
  , babel({
      exclude: 'node_modules/**'
    })
  ]
}

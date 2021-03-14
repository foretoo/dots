import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import url from '@rollup/plugin-url'
import html from 'rollup-plugin-generate-html-template'
import { terser } from 'rollup-plugin-terser'

import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const mode = process.env.PROD ? 'production' : 'development'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife'
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    babel({
      exclude: /node_modules/,
      babelHelpers: 'bundled'
    }),
    html({
      template: 'src/index.html',
      target: 'index.html'
    }),
    url({
      fileName: '[dirname][name][extname]'
    }),
    process.env.PROD && terser(),
    process.env.DEV && (
      serve({
        open: true,
        historyApiFallback: true,
        contentBase: 'build',
        host: 'localhost',
        port: 3000
      })
    ),
    process.env.DEV && livereload('build')
  ]
};

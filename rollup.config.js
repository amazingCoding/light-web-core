import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser';
module.exports = [
  {
    input: 'src/index.js',
    output: [
      { name: 'LightWeb', file: pkg.main, format: 'umd' }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      terser(
        {
          compress: {
            // pure_funcs: ['console.log']
          }
        }
      ),
    ]
  }
]
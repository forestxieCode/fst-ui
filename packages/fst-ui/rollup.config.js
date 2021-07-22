// rollup.config.js
import pkg from './package.json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'

const name = 'fst'
const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} kkb
  * @license MIT
  */`
}
const config = {
  input: 'src/index.js',
  external: ['vue'],
  output: {
    name,
    sourcemap: false,
    banner: createBanner(),
    exports: 'named',
    externalLiveBindings: false,
    globals: {
      vue: 'Vue'
    }
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.vue', '.jsx', '.js']
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.vue'],
      babelHelpers: 'bundled'
    }),
    commonjs(),
    terser(),
    json(),
    scss(),
    image()
  ]
}

export default config

// rollup.config.js
import pkg from './package.json'
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'

const name = 'cunw'
const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} kkb
  * @license MIT
  */`
}
const config = {
  input: 'src/index.js',
  output: {
    name,
    banner: createBanner(),
    exports: 'named',
    globals: {
      vue: 'Vue'
    }
  },
  plugins: [
    resolve({
      extensions: ['.vue', '.jsx', '.js']
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      presets: ['@vue/babel-preset-jsx'],
      exclude: '**/node_modules/**'
    }),
    commonjs(),
    json(),
    scss(),
    image()
  ]
}

export default config

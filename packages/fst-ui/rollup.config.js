// rollup.config.js
import pkg from './package.json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import Components from 'unplugin-vue-components/rollup'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'

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
  external: ['vue', 'lodash', 'async-validator'],
  output: {
    name,
    sourcemap: false,
    banner: createBanner(),
    exports: 'named',
    externalLiveBindings: false,
    globals: {
      vue: 'Vue',
      lodash: 'lodash',
      'async-validator': 'async-validator',
      'element-ui': 'element-ui'
    }
  },
  plugins: [
    peerDepsExternal(),
    Components({
      resolvers: [
        ElementUiResolver({
          importStyle: 'css'
        })
      ]
    }),
    resolve({
      extensions: ['.vue', '.jsx', '.js']
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    babel({
      runtimeHelpers: true
    }),
    commonjs(),
    terser(),
    json(),
    scss(),
    image()
  ]
}

export default config

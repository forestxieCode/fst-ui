/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
const components = require('../components.json')
const themePath = path.resolve(
  __dirname,
  '../src/components',
  'theme-chalk/src'
)
const fileSuffix = '.scss'
const indexFileName = 'index' + fileSuffix
const outputIndexFilePath = path.resolve(themePath, indexFileName)

;(function main() {
  save(genCssCode(getAllComponentName()))
})()

function getAllComponentName() {
  return Object.keys(components).map((componentName) => {
    return componentName.toLocaleLowerCase() + fileSuffix
  })
}

function genCssCode(componentNameList) {
  var indexContent = '@import "./base.scss";\n'

  return componentNameList.reduce((context, filePath) => {
    return (context += '@import "./' + filePath + '";\n')
  }, indexContent)
}

function save(cssCode) {
  fs.writeFileSync(outputIndexFilePath, cssCode)
}

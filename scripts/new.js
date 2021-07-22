'use strict'
console.log()
process.on('exit', () => {
  console.log()
})

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name')
  process.exit(1)
}
const path = require('path')
const fs = require('fs')
const fileSave = require('file-save')
const uppercamelcase = require('uppercamelcase')

const componentname = process.argv[2]
const chineseName = process.argv[3] || componentname
const ComponentName = uppercamelcase(componentname)

const Files = [
  {
    filename: path.join(
      `../packages/fst-ui/src/components/${componentname}`,
      'index.js'
    ),
    content: `import ${ComponentName} from './${ComponentName}'
/* istanbul ignore next */
${ComponentName}.install = function (Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName})
}

export default ${ComponentName}`
  },
  {
    filename: path.join(
      `../packages/fst-ui/src/components/${componentname}`,
      `${ComponentName}.vue`
    ),
    content: `<template>
  <div class="cw-${componentname}"></div>
</template>

<script>
export default {
  name: 'Cw${ComponentName}'
};
</script>`
  },
  {
    filename: path.join('../packages/website/src/docs', `${componentname}.md`),
    content: `## ${ComponentName} ${chineseName}`
  },
  {
    filename: path.join(
      `../packages/fst-ui/src/components/${componentname}/__tests__`,
      `${ComponentName}.spec.js`
    ),
    content: `import { mount } from '@vue/test-utils'
import ${ComponentName} from './${ComponentName}'

describe('${ComponentName}', () => {
  const wrapper = mount(${ComponentName})
  expect(wrapper.exists()).toBe(true)
})
`
  },
  {
    filename: path.join(
      '../packages/fst-ui/src/components/theme-chalk/src',
      `${componentname}.scss`
    ),
    content: `@import "mixins/mixins";
@import "common/var";

@include b(${componentname}) {
}`
  }
]
// 添加到 components.json
const componentsFile = require('../packages/fst-ui/components.json')
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`)
  process.exit(1)
}
componentsFile[componentname] = `./src/components/${componentname}/index.js`
fileSave(path.join(__dirname, '../packages/fst-ui/components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n')

// 添加到 index.scss
const sassPath = path.join(
  __dirname,
  '../packages/fst-ui/src/components/theme-chalk/src/index.scss'
)
const sassImportText = `${fs.readFileSync(
  sassPath
)}@import "./${componentname}.scss";`
fileSave(sassPath).write(sassImportText, 'utf8').end('\n')

// 创建 package
Files.forEach((file) => {
  fileSave(path.join(__dirname, file.filename))
    .write(file.content, 'utf8')
    .end('\n')
})
// 添加到 nav.config.json
const navConfigFile = require('../packages/website/src/route/nav.config.json')

navConfigFile[1].children.push({
  path: `/${componentname}`,
  title:
    componentname !== chineseName
      ? `${componentname} ${chineseName}`
      : componentname
})

fileSave(path.join(__dirname, '../packages/website/src/route/nav.config.json'))
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n')

console.log('DONE!')

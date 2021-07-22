'use strict'

const postcss = require('postcss')
const fs = require('fs')
const path = require('path')
const fontFile = fs.readFileSync(
	require.resolve('element/lib/theme-chalk/icon.css'),
	'utf8'
)

const nodes = postcss.parse(fontFile).nodes
const classList = []

nodes.forEach((node) => {
	const selector = node.selector || ''
	const reg = new RegExp(/\.el-icon-([^:]+):before/)
	const arr = selector.match(reg)

	if (arr && arr[1]) {
		classList.push(arr[1])
	}
})

classList.reverse()

fs.writeFile(
	path.resolve(__dirname, '../src/icon.json'),
	JSON.stringify(classList, null, 2) + '\n',
	() => {}
)

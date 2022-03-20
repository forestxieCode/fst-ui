// vue.config.js
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin');

const plugins = process.env.BABEL_ENV === 'development'? []:[
	new FileManagerPlugin({ // 初始化 filemanager-webpack-plugin 插件压缩实例
		onEnd: {
			delete: [ // 首先需要删除项目根目录下的dist.zip
				'./dist/dist.zip'
			],
			archive: [ // 然后我们选择dist文件夹将之打包成dist.zip并放在根目录
				{ source: './dist', destination: './dist/dist.zip' }
			]
		}
	})
]

module.exports = {
	publicPath: './fst-ui',
	configureWebpack: {
		plugins
	},
	devServer: {
		port: 8088,
	},
	chainWebpack: (config) => {
		config
			// app entry
			.entry('app')
			.clear()
			.add(path.resolve(__dirname, './src/main.js'))
			.end()

		// 添加解析 md 的 loader
		config.module
			.rule('md2vue')
			.test(/\.md$/)
			.use('vue-loader')
			.loader('vue-loader')
			.end()
			.use('md-loader')
			.loader(path.resolve(__dirname, './loader/md-loader/index.js'))
			.end()
	},
}

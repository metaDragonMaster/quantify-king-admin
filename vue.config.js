// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
module.exports = {
	lintOnSave: true,
	publicPath: './', // 基本路径
	outputDir: 'quantify-king-admin-dist', // 输出文件目录
	css: {
		requireModuleExtension: true,
		// extract: true,
		sourceMap: process.env.NODE_ENV == 'development' ? true : false,
	},
	devServer: {
		host: '0.0.0.0', // 允许外部ip访问
		port: 10375, // 端口
		https: false, // 启用https
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.resolve(__dirname, 'src'))
			.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
		// config.plugin('AutoImport').use(
		// 	AutoImport({
		// 		imports: ['vue'],
		// 		resolvers: [
		// 			ElementPlusResolver({
		// 				importStyle: 'css',
		// 				exclude: new RegExp(/^(?!.*loading-directive).*$/)
		// 			})
		// 		],
		// 		dts: './build/auto-imports.d.ts'
		// 	})
		// )
		// config.plugin('Components').use(
		// 	Components({
		// 		resolvers: [ElementPlusResolver({ importStyle: 'css' })],
		// 		dts: './build/components.d.ts'
		// 	})
		// )
		return config
	},
}

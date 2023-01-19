// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
// 	transpileDependencies: true,
// })

module.exports = {
	pages:{
		index:{
			// 入口
			entry: 'src/main.js'
		},
	},
	// 关闭语法检查
	lintOnSave:false,
}
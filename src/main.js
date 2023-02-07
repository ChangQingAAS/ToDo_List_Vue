/* 该文件是整个项目的入口文件 */
// 引入Vue
import Vue from 'vue'
// 引入APP组件，它是所有组件的父组件
import App from './App.vue'
// 引入全局样式
import './assets/global.styl'

Vue.config.productionTip = false

new Vue({
	el: '#app',
	render: h => h(App),
	beforeCreate () {
		Vue.prototype.$bus = this
	}
})

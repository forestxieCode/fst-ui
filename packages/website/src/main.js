import Vue from 'vue'
import EntryApp from './app'

import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import CunwUi from 'cunw-ui'
import 'cunw-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './route'
import hljs from 'highlight.js'
import demoBlock from './components/demo-block'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'
import title from './i18n/title'

import './demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'
import icon from './icon.json'

Vue.use(ElementUI)
Vue.use(CunwUi)
Vue.use(VueRouter)


Vue.component('demo-block', demoBlock)
Vue.component('main-header', MainHeader)
Vue.component('side-nav', SideNav)
Vue.component('footer-nav', FooterNav)

const globalEle = new Vue({
	data: { $isEle: false }, // 是否 ele 用户
})

Vue.mixin({
	computed: {
		$isEle: {
			get: () => globalEle.$data.$isEle,
			set: (data) => {
				globalEle.$data.$isEle = data
			},
		},
	},
})

Vue.prototype.$icon = icon // Icon 列表页用

const router = new VueRouter({
	mode: 'hash',
	routes,
})
router.afterEach(async (route) => {
	Vue.nextTick(() => {
		const blocks = document.querySelectorAll('pre code:not(.hljs)')
		Array.prototype.forEach.call(blocks, hljs.highlightBlock)
	})
	const data = title
	for (const val in data) {
		if (new RegExp('^' + val, 'g').test(route.name)) {
			document.title = data[val]
			return
		}
	}
	document.title = 'Element'
})

new Vue({
	// eslint-disable-line
	...EntryApp,
	router,
}).$mount('#app')

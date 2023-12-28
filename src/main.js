import * as Vue from 'vue'

import { createApp } from 'vue';

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-plus'
import './styles/element-variables.module.scss'
// import enLang from 'element-plus/dist/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import enLang from "element-plus/dist/locale/en.mjs"

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import 'virtual:svg-icons-register'

import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// Vue.component('svg-icon', SvgIcon)

import * as filters from './filters' // global filters
import { mockXHR } from '../mock'
import element from 'element-plus'
import 'element-plus/dist/index.css'
import {ElMessage} from 'element-plus'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {

  mockXHR()
// }






// new Vue({
//   el: '#app',
//   router,
//   store,
//   render: h => h(App)
// })

const app = createApp(App);

app.config.productionTip = false

app.component('svg-icon', SvgIcon)

app.use(router)
app.use(store)
app.use(element)


//https://stackoverflow.com/questions/65184107/how-to-use-vue-prototype-or-global-variable-in-vue-3
//如果没有全局引用element，还需写下面一句
app.config.globalProperties.$message = ElMessage;

app.provide('$message', ElMessage)

app.config.globalProperties.$filters = filters

// // register global utility filters
// Object.keys(filters).forEach(key => {
//   app.filter(key, filters[key])
// })

app.use(Element, {
  size: Cookies.get('size') || 'default', // set element-plus default size
  locale: enLang // 如果使用中文，无需设置，请删除
})


// importing our new icon component globally
// app.component('icon', icon);

app.mount('#app');


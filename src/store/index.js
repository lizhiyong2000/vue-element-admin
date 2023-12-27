import * as Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

// Vue.use(Vuex)

// // https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})


const modulesFiles = import.meta.glob('./modules/*.js',{ eager: true }); // 异步方式


let modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
    //名称  因为这里拿到的是  ./modules/app.js ，所以需要两层处理
  var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  const name = moduleName.split('/')[1]
 
  //具体的内容，都是每个js中返回值  value.default
  modules[name] = value.default
}


const store = new Vuex.Store({
  modules,
  getters
})

export default store

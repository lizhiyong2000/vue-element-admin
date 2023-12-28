// const req = require.context('../../icons/svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys()

// const re = /\.\/(.*)\.svg/

// const svgIcons = requireAll(req).map(i => {
//   return i.match(re)[1]
// })

// export default svgIcons



const modulesFiles = import.meta.glob('./svg/*.svg',{ eager: true }); // 异步方式


let svgIcons = {}
for (const [key, value] of Object.entries(modulesFiles)) {
    //名称  因为这里拿到的是  ./modules/app.js ，所以需要两层处理
  var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  const name = moduleName.split('/')[1]
 
  //具体的内容，都是每个js中返回值  value.default
  svgIcons[name] = value.default
}

export default svgIcons
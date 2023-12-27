import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  // console.log(`router from :${from.path}, to:${to.path}`)
  
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  console.log(`router from :${from.path}, to:${to.path}, hasToken:${hasToken}`)

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939

    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      console.log(`router from :${from.path}, to:${to.path}, hasRoles:${hasRoles}`)
      if (hasRoles) {
        try {
           // generate accessible routes map based on roles
           const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)

           // dynamically add accessible routes
           // router.addRoutes(accessRoutes)

           accessRoutes.forEach(function(route){
            router.addRoute(route);
          })
 
          //  console.log('router add routes %0', accessRoutes)

          next()
        }
        catch (error) {

          console.log('error %0', error)

        }
        // next({ ...to, replace: true })
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          accessRoutes.forEach(function(route){
            router.addRoute(route);
          })

          console.log('router add routes %0', accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {

          console.log('user/getInfo error %0', error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    try {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }

  }
  catch (error) {

    console.log('error %0', error)

  }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/myAuth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// 全局前置导航守卫
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    // 有沒有获取到当前用户可以访问的菜单
    if (store.state.user.permissionList && store.state.user.permissionList.length > 0) {
      if (to.meta && to.meta.btnPermissionList) {
        store.commit('user/SET_BTN_PERMISSIMO_LIST', to.meta.btnPermissionList)
      }
      next()
    } else {
      // 没有可以访问的菜单，去动态添加菜单后放行
      store.dispatch('user/getMenuList').then(() => {
        if (to.meta && to.meta.btnPermissionList) {
          // 有沒有獲取到按鈕權限
          store.commit('user/SET_BTN_PERMISSIMO_LIST', to.meta.btnPermissionList)
        }
        next(to.path)
      })
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

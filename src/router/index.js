import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import { getToken } from '../libs/util'

Vue.use(Router)
const router = new Router({
  base: '/web/',
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'
const MAIN_PAGE_NAME = 'main'
const FILTER_PAGE_NAME = 'main、spotCheck、spotCheckDetail、criterion、criterionDetail、law、lawDetail、lawView、flightCheck、flightCheckDetail、article、articleDetail、view_file'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  // 过滤展示页无需权限的白名单
  if (!to.name) {
    next({
      name: MAIN_PAGE_NAME // 跳转到展示首页
    })
  } else if (!token && to.name === 'view') {
    next({
      name: 'main' // 跳转到home页
    })
  } else if (token && to.name === 'view') {
    next({
      name: 'main' // 跳转到home页
    })
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      name: 'home'
    })
  } else if (!token && FILTER_PAGE_NAME.indexOf(to.name) !== -1) {
    next() // 跳转
  } else if (token && FILTER_PAGE_NAME.indexOf(to.name) !== -1) {
    next() // 跳转
  } else if (token && FILTER_PAGE_NAME.indexOf(to.name) === -1) {
    next({
      name: 'main' // 跳转到home页
    })
  } else if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: MAIN_PAGE_NAME // 跳转到展示首页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'main' // 跳转到home页
    })
  } else {
    next()
    // store.dispatch('getUserInfo').then(user => {
    //   // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
    //   if (canTurnTo(to.name, user.access, routes)) next() // 有权限，可访问
    //   else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
    // })
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router

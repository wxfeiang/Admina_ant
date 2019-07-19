import Vue from 'vue'
import router, { resetRouter } from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN, DEFAULT_LOCK, DEFAULT_CURGROUP } from '@/store/mutation-types'

NProgress.configure({
  showSpinner: false
})

const whiteList = ['login', 'register', 'registerResult']

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  console.log('to.name:   ' + to.name)
  if (Vue.ls.get(DEFAULT_LOCK) === 'lock' && to.name !== 'lock') {
    next({
      replace: true,
      name: 'lock'
    })
  } else if (Vue.ls.get(DEFAULT_LOCK) === 'unlock' && to.name === 'lock') {
    next(false)
  } else if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({
        path: '/home'
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        resetRouter()
        store
          .dispatch('GetInfo', Vue.ls.get(DEFAULT_CURGROUP) ? Vue.ls.get(DEFAULT_CURGROUP) : 0)
          .then((res) => {
            // const roles = res.result && res.result.role
            const { menu, role } = res.data
            const toData = {
              menus: menu,
              roles: role
            }
            store
              .dispatch('GenerateRoutes', {
                toData
              })
              .then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                if (to.path === redirect) {
                  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  next({
                    ...to,
                    replace: true
                  })
                } else {
                  // 跳转到目的路由
                  next({
                    path: redirect
                  })
                }
              })
          })
          .catch((err) => {
            notification.error({
              message: '登录失败!',
              description: `${err}`
            })
            store.dispatch('Logout').then(() => {
              next({
                path: '/user/login',
                query: {
                  redirect: to.fullPath
                }
              })
            })
            NProgress.done()
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({
        path: '/user/login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

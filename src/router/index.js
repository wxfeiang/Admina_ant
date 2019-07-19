import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

Vue.use(Router)
const createRouter = () =>
  new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRouterMap
  })
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
export default router

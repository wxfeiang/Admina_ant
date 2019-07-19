import { constantRouterMap } from '@/config/router.config'
import _import from '@/utils/import'
const BasicLayout = _import('BasicLayout', 'layouts')
const PageView = _import('PageView', 'layouts')
const RouteView = _import('RouteView', 'layouts')

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter(routerMap) {
  const accessedRouters = routerMap.filter((route) => {
    // if (hasPermission(roles.permissionList, route)) {
    //   if (route.children && route.children.length) {
    //     route.children = filterAsyncRouter(route.children, roles)
    //   }
    //   return true
    // }
    // return false

    // if (hasPermission(roles.permissionList, route)) {
    if (route.component) {
      if (route.component === 'BasicLayout') {
        route.component = BasicLayout
      } else if (route.component === 'PageView') {
        route.component = PageView
      } else if (route.component === 'RouteView') {
        route.component = RouteView
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
    // }
    // return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { menus } = data.toData
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        const accessedRouters = filterAsyncRouter(menus)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission

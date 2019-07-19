import Vue from 'vue'
import { login, logout } from '@/api/login'
import { UserInfo } from '@/api/user'
import { ACCESS_TOKEN, DEFAULT_CURGROUP } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
// import { localUser, localUserInfo } from '@/config/localUserInfo'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    mchId: '',
    roleId: '',
    groups: [],
    curgroup: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_MCH: (state, mchId) => {
      state.mchId = mchId
    },
    SET_ROLE: (state, roleId) => {
      state.roleId = roleId
    },
    SET_GROUPS: (state, groups) => {
      state.groups = groups
    },
    SET_CURGROUP: (state, curgroup) => {
      state.curgroup = curgroup
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // if (userInfo.password === '3fde6bb0541387e4ebdadf7c2ff31123' || true) {
        //   const result = localUser.data
        //   Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        //   commit('SET_TOKEN', result.token)
        //   resolve()
        // } else {
        //   const error = {
        //     data: {},
        //     status: 500,
        //     sign: '',
        //     reasonPhrase: '用户名或密码错误!'
        //   }
        //   reject(error)
        // }

        login(userInfo)
          .then((response) => {
            if (response.status === 200 && response.data === '9999') {
              reject(response)
            } else {
              const result = response.data
              Vue.ls.set(ACCESS_TOKEN, '3fde6bb0541387e4ebdadf7c2ff31123', 7 * 24 * 60 * 60 * 1000)
              Vue.ls.set('USERID', result.id)
              commit('SET_TOKEN', '3fde6bb0541387e4ebdadf7c2ff31123')
              resolve()
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }, curGroup) {
      return new Promise((resolve, reject) => {
        // const role = localUserInfo.data.role
        // role.permissions = localUserInfo.data.role.permissions
        // role.permissions.map((per) => {
        //   if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //     const action = per.actionEntitySet.map((action) => {
        //       return action.action
        //     })
        //     per.actionList = action
        //   }
        // })
        // role.permissionList = role.permissions.map((permission) => {
        //   return permission.permissionId
        // })
        // commit('SET_ROLES', localUserInfo.data.role)
        // commit('SET_INFO', localUserInfo.data)
        // commit('SET_MCH', localUserInfo.data.mchId)
        // commit('SET_ROLE', localUserInfo.data.roleId)
        // commit('SET_NAME', {
        //   name: localUserInfo.data.name,
        //   welcome: welcome()
        // })
        // commit('SET_AVATAR', localUserInfo.data.avatar)
        // resolve(localUserInfo)
        UserInfo({ uId: Vue.ls.get('USERID'), gId: curGroup })
          .then((response) => {
            const result = response.data
            if (result.role && result.role.permissions.length > 0) {
              const role = result.role
              role.permissions = result.role.permissions
              role.permissions.map((per) => {
                if (per.actionList != null && per.actionList.length > 0) {
                  const action = per.actionList.map((action) => {
                    return action.gValue
                  })
                  per.actionEntitySet = action
                }
              })
              role.permissionList = role.permissions.map((permission) => {
                return permission.permissionId
              })
              commit('SET_ROLES', result.role)
              commit('SET_INFO', result)
              commit('SET_GROUPS', result.group)
              if (curGroup === 0) {
                const curGroup = result.group.filter((item) => {
                  return item.isDefault === 'true'
                })
                commit('SET_CURGROUP', curGroup[0].gId)
                Vue.ls.set(DEFAULT_CURGROUP, curGroup[0].gId)
              } else {
                commit('SET_CURGROUP', curGroup)
                Vue.ls.set(DEFAULT_CURGROUP, curGroup)
              }
              commit('SET_NAME', {
                name: result.name,
                welcome: welcome()
              })
              commit('SET_AVATAR', result.avatar)
              commit('SET_MCH', result.mchId)
              resolve(response)
            } else {
              reject(new Error(`${response.reasonPhrase}`))
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove('USERID')
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
        // logout()
        //   .then((response) => {
        //     console.log('store logout: ' + JSON.stringify(response))
        //     commit('SET_TOKEN', '')
        //     commit('SET_ROLES', [])
        //     Vue.ls.remove(ACCESS_TOKEN)
        //     resolve()
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
      })
    },
    ClearRoles({ commit }, datas) {
      return new Promise((resolve) => {
        commit('SET_ROLES', [])
        commit('SET_CURGROUP', datas.group.gId)
        Vue.ls.set(DEFAULT_CURGROUP, datas.group.gId)
        resolve()
      })
    }
  }
}

export default user

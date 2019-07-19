import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '', // process.env.VUE_APP_API_BASE_URL
  timeout: 60000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data.reasonPhrase
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 500) {
      notification.error({
        message: '异常',
        description: data
      })
    }
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data
      })
    }
    if (error.response.status === 401 && !data) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use((config) => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    // config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers = {
      'Access-Token': `${token}`,
      'Content-Type': 'application/json' //application/x-ww-form-urlencoded
    }
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service)
  }
}

export { installer as VueAxios, service as axios }

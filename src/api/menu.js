import api from './index'
import { axios } from '@/utils/request'

// 获取菜单列表
export function MenuList() {
  return axios({
    url: api.SysMenuList,
    method: 'get'
  })
}

// 新增菜单
export function MenuAdd(parameter) {
  return axios({
    url: api.SysMenuAdd,
    method: 'post',
    data: parameter
  })
}

// 修改菜单
export function MenuEdit(parameter) {
  return axios({
    url: api.SysMenuEdit,
    method: 'post',
    data: parameter
  })
}

// 获取子菜单列表下拉列表
export function MenuSelect() {
  return axios({
    url: api.SysMenuSelect,
    method: 'get'
  })
}

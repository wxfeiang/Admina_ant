import api from './index'
import { axios } from '@/utils/request'

// 获取角色列表
export function RoleList(parameter) {
  return axios({
    url: api.SysRoleList,
    method: 'get',
    params: parameter
  })
}

// 获取角色列表用户下拉列表
export function RoleSelect() {
  return axios({
    url: api.SysRoleSelect,
    method: 'get'
  })
}

// 新增角色
export function RoleAdd(parameter) {
  return axios({
    url: api.SysRoleAdd,
    method: 'post',
    data: parameter
  })
}

// 修改角色
export function RoleEdit(parameter) {
  return axios({
    url: api.SysRoleEdit,
    method: 'post',
    data: parameter
  })
}

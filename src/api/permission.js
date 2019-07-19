import api from './index'
import { axios } from '@/utils/request'

// 获取权限粒度列表
export function PerGranList() {
  return axios({
    url: api.SysPerGranList,
    method: 'get'
  })
}

// 新增权限粒度
export function PerGranAdd(parameter) {
  return axios({
    url: api.SysPerGranAdd,
    method: 'post',
    data: parameter
  })
}

// 修改权限粒度
export function PerGranEdit(parameter) {
  return axios({
    url: api.SysPerGranEdit,
    method: 'post',
    data: parameter
  })
}
//
// 获取权限粒度列表
export function PerGranGet() {
  return axios({
    url: api.SysPerGranGet,
    method: 'get'
  })
}

// 获取权限列表
export function PerList(parameter) {
  return axios({
    url: api.SysPerList,
    method: 'get',
    params: parameter
  })
}

// 获取权限下拉列表
export function PerSelect() {
  return axios({
    url: api.SysPerSelect,
    method: 'get'
  })
}

// 新增权限
export function PerAdd(parameter) {
  return axios({
    url: api.SysPerAdd,
    method: 'post',
    data: parameter
  })
}

// 修改权限
export function PerEdit(parameter) {
  return axios({
    url: api.SysPerEdit,
    method: 'post',
    data: parameter
  })
}

// 根据角色id获取权限数据
export function PerListByRoleId(parameter) {
  return axios({
    url: api.SysPerByRoleId,
    method: 'get',
    params: { rId: parameter }
  })
}

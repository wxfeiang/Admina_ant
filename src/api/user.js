import api from './index'
import { axios } from '@/utils/request'

// 获取用户列表(分页)
export function UserList(parameter) {
  return axios({
    url: api.SysUserList,
    method: 'get',
    params: parameter
  })
}

// 新增用户
export function UserAdd(parameter) {
  return axios({
    url: api.SysUserAdd,
    method: 'post',
    data: parameter
  })
}

// 编辑用户
export function UserEdit(parameter) {
  return axios({
    url: api.SysUserEdit,
    method: 'post',
    data: parameter
  })
}

// 获取用户信息 by user_id
export function UserInfo(parameter) {
  return axios({
    url: api.SysUserInfo,
    method: 'get',
    params: parameter
  })
}

// 获取用户组列表(分页)
export function UserGroupList(parameter) {
  return axios({
    url: api.SysUserGroupList,
    method: 'get',
    params: parameter
  })
}

// 新增用户组
export function UserGroupAdd(parameter) {
  return axios({
    url: api.SysUserGroupAdd,
    method: 'post',
    data: parameter
  })
}

// 编辑用户组
export function UserGroupEdit(parameter) {
  return axios({
    url: api.SysUserGroupEdit,
    method: 'post',
    data: parameter
  })
}

// 获取有效的用户组
export function UserGroupSelect(parameter) {
  return axios({
    url: api.SysUserGroupSelect,
    method: 'get',
    params: parameter
  })
}

// 获取商户下有效用户(已进组、未进组)
export function UserGroupUserList(parameter) {
  return axios({
    url: api.SysUserGroupUserList,
    method: 'get',
    params: parameter
  })
}

// 户与用户组关联
export function UserGroupLinkUser(parameter) {
  return axios({
    url: api.SysUserGroupLinkUser,
    method: 'post',
    data: parameter
  })
}

// 修改用户关联的用户组的默认组
export function UserGroupDefaultEdit(parameter) {
  return axios({
    url: api.SysUserGroupDefaultEdit,
    method: 'post',
    data: parameter
  })
}

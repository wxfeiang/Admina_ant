import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  carList: '/car/list',
  park: '/park',
  artList: '/art/list',
  permission: '/permission',
  orgTree: '/org/tree',
  menuTree: '/menu/tree'
}

export default api

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permission,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree(parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id === 0 ? 'post' : 'put',
    data: parameter
  })
}

/*
 * 停车场列表接口
 */
export function getParkList(parameter) {
  return axios({
    url: api.park,
    method: 'get',
    params: parameter
  })
}

/*
 * 车辆列表接口
 */
export function getCarList(parameter) {
  return axios({
    url: api.carList,
    method: 'get',
    params: parameter
  })
}

/*
 * 文章列表接口
 */
export function getArtList(parameter) {
  return axios({
    url: api.artList,
    method: 'get',
    params: parameter
  })
}

/*
 * 文章列表接口
 */
export function getMenuTree(parameter) {
  return axios({
    url: api.menuTree,
    method: 'get',
    params: parameter
  })
}

import api from './index'
import { axios } from '@/utils/request'

// 发行机构列表
export function getOrgList(parameter) {
  return axios({
    url: api.OrgList,
    method: 'get',
    params: parameter
  })
}

// 发行机构明细
export function getOrgDetail(parameter) {
  return axios({
    url: api.OrgDetail,
    method: 'get',
    params: parameter
  })
}

// 发行机构新增接口 单个
export function OrgAdd(parameter) {
  return axios({
    url: api.OrgAdd,
    method: 'post',
    data: parameter
  })
}

// 发行机构修改接口
export function OrgEdit(parameter) {
  return axios({
    url: api.OrgEdit,
    method: 'post',
    data: parameter
  })
}

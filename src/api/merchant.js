import api from './index'
import { axios } from '@/utils/request'

// 商户列表+停车场列表+费率列表  无分页
export function MchParkRateList(parameter) {
  return axios({
    url: api.MchParkRateList,
    method: 'get',
    params: parameter
  })
}

// 商户列表 带分页
export function MerchantList(parameter) {
  return axios({
    url: api.MerchantList,
    method: 'get',
    params: parameter
  })
}

export function generatingKeyById(parameter) {
  return axios({
    url: api.generatingKeyById,
    method: 'get',
    params: parameter
  })
}
// 商户列表
export function MerchantAll(parameter) {
  return axios({
    url: api.MerchantAll,
    method: 'get',
    params: parameter
  })
}

// 商户明细
export function MerchantDetail(parameter) {
  return axios({
    url: api.MerchantDetail,
    method: 'get',
    params: parameter
  })
}

// 商户关联停车场明细
export function MerchantParkDetail(parameter) {
  return axios({
    url: api.MerchantParkDetail,
    method: 'get',
    params: parameter
  })
}

// 商户新增接口 单个
export function MerchantAdd(parameter) {
  return axios({
    url: api.MerchantAdd,
    method: 'post',
    data: parameter
  })
}

// 商户新增接口 串行
export function MerchantAddNew(parameter) {
  return axios({
    url: api.MerchantAddNew,
    method: 'post',
    data: parameter
  })
}

// 商户修改接口
export function MerchantEdit(parameter) {
  return axios({
    url: api.MerchantEdit,
    method: 'post',
    data: parameter
  })
}

import api from './index'
import { axios } from '@/utils/request'

export function SysPayOrderList(parameter) {
  return axios({
    url: api.SysPayOrderList,
    method: 'post',
    data: parameter
  })
}

export function SysPayOrderListByCondition(parameter) {
  return axios({
    url: api.SysPayOrderListByMulCondition,
    method: 'get',
    params: parameter
  })
}

export function SysPayBillList(parameter) {
  return axios({
    url: api.SysPayBillList,
    method: 'get',
    params: parameter
  })
}

export function SysPayBillListByCondition(parameter) {
  return axios({
    url: api.SysPayBillListByCondition,
    method: 'get',
    params: parameter
  })
}

export function SysGoodsOrderByCondition(parameter) {
  return axios({
    url: api.SysGoodsOrderByCondition,
    method: 'post',
    data: parameter
  })
}

export function SysPayOrderPushById(parameter) {
  return axios({
    url: api.SysPayOrderPushById + parameter,
    method: 'get'
  })
}

export function SysRefundOrder(parameter) {
  return axios({
    url: api.SysRefundOrder,
    method: 'post',
    data: parameter
  })
}

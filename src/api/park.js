import api from './index'
import { axios } from '@/utils/request'

// 停车场列表
export function getParkList(parameter) {
  return axios({
    url: api.ParkList,
    method: 'get',
    params: parameter
  })
}

// 停车场明细
export function getParkDetail(parameter) {
  return axios({
    url: api.ParkDetail,
    method: 'get',
    params: parameter
  })
}

// 停车场新增接口 单个
export function parkAdd(parameter) {
  return axios({
    url: api.ParkAdd,
    method: 'post',
    data: parameter
  })
}

// 停车场新增接口 串行
export function ParkAddNew(parameter) {
  return axios({
    url: api.ParkAddNew,
    method: 'post',
    data: parameter
  })
}

// 停车场新增获取商户接口
export function parkListMch() {
  return axios({
    url: api.parkListMch,
    method: 'get'
  })
}

// 停车场修改接口
export function parkEdit(parameter) {
  return axios({
    url: api.ParkEdit,
    method: 'post',
    data: parameter
  })
}

export function getParkFeeInfo(parameter) {
  return axios({
    url: api.ParkFeeInfo,
    method: 'get',
    params: {
      rateId:parameter
    }
  })
}

// 停车场费率查询接口
export function getParkFeeDetail(parameter) {
  return axios({
    url: api.ParkFeeDetail,
    method: 'get',
    params: parameter
  })
}

// 停车场费率新增接口 单个
export function addParkFee(parameter) {
  return axios({
    url: api.ParkFeeAdd,
    method: 'post',
    data: parameter
  })
}

// 停车场费率新增接口 串行
export function ParkFeeAddNew(parameter) {
  return axios({
    url: api.ParkFeeAddNew,
    method: 'post',
    data: parameter
  })
}

// 停车场费率修改接口
export function updateParkFee(parameter) {
  return axios({
    url: api.ParkFeeEdit,
    method: 'post',
    data: parameter
  })
}

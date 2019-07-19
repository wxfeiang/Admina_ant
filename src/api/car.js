import api from './index'
import { axios } from '@/utils/request'

export function CarList(parameter) {
  return axios({
    url: api.CarList,
    method: 'post',
    data: parameter
  })
}

export function CarAdd(parameter) {
  return axios({
    url: api.CarAdd,
    method: 'post',
    data: parameter
  })
}

export function CarEdit(parameter) {
  return axios({
    url: api.CarEdit,
    method: 'post',
    data: parameter
  })
}

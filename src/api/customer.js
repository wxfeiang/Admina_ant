import api from './index'
import { axios } from '@/utils/request'

export function CustomerList(parameter) {
  return axios({
    url: api.CustomerList,
    method: 'post',
    data: parameter
  })
}

export function CustomerEdit(parameter) {
  return axios({
    url: api.CustomerEdit,
    method: 'post',
    data: parameter
  })
}

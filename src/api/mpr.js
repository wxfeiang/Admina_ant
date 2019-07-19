import api from './index'
import { axios } from '@/utils/request'

export function MprAddUser(parameter) {
  return axios({
    url: api.MprAddUser,
    method: 'post',
    data: parameter
  })
}

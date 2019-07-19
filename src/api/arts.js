import api from './index'
import { axios } from '@/utils/request'

export function getArtList(parameter) {
  return axios({
    url: api.ArtsList,
    method: 'get',
    params: parameter
  })
}

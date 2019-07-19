import api from './index'
import { axios } from '@/utils/request'

export function NewsAdd(parameter) {
  return axios({
    url: api.NewsAdd,
    method: 'post',
    data: parameter
  })
}

export function NewsUpdate(parameter) {
  return axios({
    url: api.NewsUpdate,
    method: 'post',
    data: parameter
  })
}

export function UploadImg(parameter) {
  return axios({
    url: api.UploadImg,
    method: 'post',
    data: parameter
  })
}

export function DeleteImg(parameter) {
  return axios({
    url: api.DeleteImg,
    method: 'get',
    params: { imageId: parameter }
  })
}
export function DownloadImg(parameter) {
  return axios({
    url: api.DownloadImg,
    method: 'get',
    params: { imageId: parameter }
  })
}

export function SysNewsList(parameter) {
  return axios({
    url: api.SysNewsList,
    method: 'post',
    data: parameter
  })
}

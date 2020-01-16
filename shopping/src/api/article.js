import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function createArticle(params) {
  return request({
    url: '/article/create',
    method: 'post',
    params
  })
}

export function updateArticle(params) {
  return request({
    url: '/article/update',
    method: 'post',
    params
  })
}
import {hyRequest} from './index'
export function getToopMV(data) {
  return hyRequest.get({
    url: '/top/mv',
    data
  })
}

export function getMVUrl(data) {
  return hyRequest.get({
    url: '/mv/url',
    data
  })
}

export function getMVInfo(data) {
  return hyRequest.get({
    url: '/mv/detail',
    data
  })
}

export function getMVRelate(data) {
  return hyRequest.get({
    url: '/related/allvideo',
    data
  })
}


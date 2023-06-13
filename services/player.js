import {hyRequest} from './index'

export function getSongDetail(data) {
  return hyRequest.get({
    url: '/song/detail',
    data
  })
}

export function getSongLyric(data) {
  return hyRequest.get({
    url: '/lyric',
    data
  })
}
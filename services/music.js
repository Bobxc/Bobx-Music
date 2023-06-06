import {
  hyRequest
} from './index'
export function getMusicBanner(data) {
  return hyRequest.get({
    url: '/banner',
    data
  })
}

export function getPlaylistDetail(data) {
  return hyRequest.get({
    url: "/playlist/detail",
    data
  })
}

export function getSongMenuList(data) {
  return hyRequest.get({
    url: "/top/playlist",
    data
  })
}
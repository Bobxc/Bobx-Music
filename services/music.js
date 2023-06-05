import {
  hyRequest
} from './index'
export function getMusicBanner(data) {
  return hyRequest.get({
    url: '/banner',
    data
  })
}
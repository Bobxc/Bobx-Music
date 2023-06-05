// pages/detail-video/detail-video.js
import {
  getMVUrl,
  getMVInfo,
  getMVRelate
} from '../../services/video'
Page({
  data: {
    id: null,
    mvUrl: '',

  },
  onLoad(options) {
    const id = options.id
    this.setData({
      id
    })
    this.fetchMVUrl()
    this.fetchMVInfo()
    this.fetchMVRelated()
  },

  async fetchMVUrl() {
    const res = await getMVUrl({
      id: this.data.id
    })
    const {
      url
    } = res.data
    this.setData({
      mvUrl: url
    })
  },
  async fetchMVInfo() {
    const data = {
      mvid: this.data.id
    }
    const res = await getMVInfo(data)
    console.log(res)
  },
  async fetchMVRelated() {
    const data = {
      id: this.data.id
    }
    const res = await getMVRelate(data)
  }
})
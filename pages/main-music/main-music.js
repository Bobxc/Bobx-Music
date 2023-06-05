// pages/main-music/main-music.js
import {getMusicBanner} from '../../services/music'
Page({
  data: {
    searchValue: '',
    banners: []
  },
  onLoad() {
    this.fetchMusicBanner()
  },
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  async fetchMusicBanner() {
    const res = await getMusicBanner()
    this.setData({
      banners: res.banners
    })
  }
})
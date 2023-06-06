// pages/detail-song/detail-song.js
Page({
  data: {
    type: 'ranking'
  },
  onLoad(options) {
    const {type} = options
    this.setData({type})
  }
})
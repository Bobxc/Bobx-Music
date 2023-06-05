// pages/main-video/main-video.js
import {
  getToopMV
} from '../../services/video'
Page({
  data: {
    videoList: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.fetchTopMv()
  },

   //监听上拉功能
   onReachBottom() {
    if(this.data.hasMore) this.fetchTopMv()
  },
  //下拉刷新
  async onPullDownRefresh() {
    this.setData({
      videoList: [],
      offset: 0,
      hasMore: true
    })
    await this.fetchTopMv()

    //停止下来刷新
    wx.stopPullDownRefresh()
  },
  async fetchTopMv() {
    let data = {
      limit: 20,
      offset: this.data.offset
    }
    let res = await getToopMV(data)
    const newVideoList = [...this.data.videoList,...res.data]
    this.setData({
      videoList: newVideoList
    })
    this.data.offset = this.data.videoList.length
    this.data.hasMore = res.hasMore
  },
  /* onVideoItemTap(e){
    console.log(e.currentTarget.dataset.item)
    const item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-video/detail-video?id=${item.id}`,
    })
  }, */
 
})
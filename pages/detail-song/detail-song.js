// pages/detail-song/detail-song.js
import recommendStore from '../../store/recommendStore'
import rankingStore from '../../store/rankingStore'
import {getPlaylistDetail} from '../../services/music'
Page({
  data: {
    type: 'ranking',
    key: 'newRanking',
    id: '',
    songInfo: {}
  },
  onLoad(options) {
    const {type} = options
    this.setData({type})

    if(type === 'ranking') {
      const key = options.key
      this.data.key = key
      rankingStore.onState(key, this.handleRanking)
    } else if(type === 'recommend') {
      recommendStore.onState('recommendSongInfo', this.handleRanking)
    } else if(type === 'menu') {
      const id = options.id
      this.data.id = id
      this.fetchMenuSongInfo()
    }
  },
  onUnload() {
    if(this.data.type === 'ranking') {
      rankingStore.offState(this.data.key, this.handleRanking)
    } else if(this.data.type === 'recommend') {
      recommendStore.offState('recommendSongInfo', this.handleRanking)
    }
  },
  async fetchMenuSongInfo() {
    const res = await getPlaylistDetail({id: this.data.id})
    this.setData({
      songInfo: res.playlist
    })
  },
  handleRanking(value) {
    this.setData({
      songInfo: value
    })
    wx.setNavigationBarTitle({
      title: value.name,
    })
  },
  
})
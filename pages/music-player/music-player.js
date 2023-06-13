// pages/music-player/music-player.js
import playerStore, {audioContext} from '../../store/playerStore'
import {throttle} from 'underscore'
const app = getApp()
const modeNames = ['order', 'repeat', 'random']
Page({
  data: {
    statusHeight: 20,
    currentPage: 0,
    contentHeight: 555,

    isFirstPlay: true,
    id: 0,
    currentSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    currentLyricIndex: 0,
    currentLyricText: '',

    lyricScrollTop: 0,

    playListSongs: [],
    playListIndex: 0,
    playModeIndex: 0,
    playModeName: 'order',
    isPlaying: false,

    sliderValue: 0,
    isSliderChanging: false
  },
  onLoad(options) {
    const id = options.id
    this.setData({id})

    //设备信息
    this.setData({
      statusHeight: app.globalData.statusHeight,
      contentHeight: app.globalData.windowHeight
    })

    playerStore.dispatch('playMusicWithSongId', id)

    playerStore.onStates(['currentSong', 'durationTime', 'currentTime', 'currentLyricText' ], this.getSongAllInfos)
  },

  updateProcess: throttle(function(currentTime) {
    if(!this.data.isSliderChanging) {
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({sliderValue, currentTime})
    }
  }, 500, {leading: false, trailing: false}),
  onBackTop() {
    wx.navigateBack()
  },
  onSwiperChange(e) {
    const currentPage = e.detail.current
    this.setData({currentPage})
  },
  onSliderChange() {

  },
  onSliderChanging() {

  },


  getSongAllInfos({currentSong, durationTime, currentTime, currentLyricText}) {
    if(currentSong) {
      this.setData({currentSong})
    }
    if(durationTime) {
      this.setData({durationTime})
    }
    if(currentTime) {
      // this.setData({currentTime})
      this.updateProcess(currentTime)
    }
    if(currentLyricText) {
      this.setData({currentLyricText})
    }
  }
})
// pages/main-music/main-music.js
import {getMusicBanner, getSongMenuList} from '../../services/music'
import querySelect from '../../utils/query-select'
import throttle from '../../utils/throttle'
import recommendStore from '../../store/recommendStore'
const querySelectThrottle = throttle(querySelect, 100)

Page({
  data: {
    searchValue: '',
    banners: [],
    bannerHeight: 150,
    
    recommendSongs: [],
    //歌单数据
    hotMenuList: [],
    recMenuList: [],

    //巅峰榜数据
    isRankingData: false,
    rankingInfos: {}
  },
  onLoad() {
    this.fetchMusicBanner()
    this.fetchSongMenuList()
    recommendStore.onState('recommendSongInfo', this.handleRecommendSongs)
    recommendStore.dispatch('fetchRecommendSongsAction')
  },
  onUnload() {
    recommendStore.offState("recommendSongs", this.handleRecommendSongs)
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
  },
  async fetchSongMenuList() {
    getSongMenuList({cat: '全部', limit: 6, offset: 0}).then(res => {
      this.setData({hotMenuList: res.playlists})
    })
    getSongMenuList({cat: '华语', limit: 6, offset: 0}).then(res => {
      this.setData({recMenuList: res.playlists})
    })
  },
  async onBannerImageLoad(e) {
    //获取image组件高度
    const res = await querySelectThrottle('.banner-image')
    this.setData({
      bannerHeight: res[0].height
    })
  },
  onRecomendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
  handleRecommendSongs(value) {
    if(!value.tracks) return
    this.setData({recommendSongs: value.tracks.slice(0, 6)})
  }

})
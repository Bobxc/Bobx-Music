// pages/main-music/main-music.js
import {
  getMusicBanner,
  getSongMenuList
} from '../../services/music'
import querySelect from '../../utils/query-select'
import throttle from '../../utils/throttle'
import recommendStore from '../../store/recommendStore'
import rankingStore from '../../store/rankingStore'
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
    rankingStore.onState('newRanking', this.handleNewRanking)
    rankingStore.onState('originRanking', this.handleOrignRanking)
    rankingStore.onState('upRanking', this.handleUpRanking)
    rankingStore.dispatch('fetchRankingDataAction')
  },
  onUnload() {
    recommendStore.offState("recommendSongs", this.handleRecommendSongs)
    rankingStore.offState("newRanking", this.handleNewRanking)
    rankingStore.offState("originRanking", this.handleOrignRanking)
    rankingStore.offState("upRanking", this.handleUpRanking)
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
    getSongMenuList({
      cat: '全部',
      limit: 6,
      offset: 0
    }).then(res => {
      this.setData({
        hotMenuList: res.playlists
      })
    })
    getSongMenuList({
      cat: '华语',
      limit: 6,
      offset: 0
    }).then(res => {
      this.setData({
        recMenuList: res.playlists
      })
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
    if (!value.tracks) return
    this.setData({
      recommendSongs: value.tracks.slice(0, 6)
    })
  },
  handleNewRanking(value) {
    if (!value.name) return
    this.setData({
      isRankingData: true
    })
    const newRankingInfos = {
      ...this.data.rankingInfos,
      newRanking: value
    }
    this.setData({
      rankingInfos: newRankingInfos
    })
  },
  handleOrignRanking(value) {
    if(!value.name) return
    this.setData({
      isRankingData: true
    })
    const orignRankingInfos = {
      ...this.data.rankingInfos,
      orignRanking: value
    }
    this.setData({
      rankingInfos: orignRankingInfos
    })
  },
  handleUpRanking(value) {
    if(!value.name) return
    this.setData({
      isRankingData: true
    })
    const upRankingInfos = {
      ...this.data.rankingInfos,
      upRanking: value
    }
    this.setData({
      rankingInfos: upRankingInfos
    })
  }

})
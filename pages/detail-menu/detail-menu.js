// pages/detail-menu/detail-menu.js
import {getSongMenuTag, getSongMenuList} from '../../services/music'
Page({
  data: {
    songMenus: []
  },
  onLoad() {
    this.fetchAllMenuList()
  },
  async fetchAllMenuList() {
    // 1.获取tags
    const tagRes = await getSongMenuTag()
    const tags = tagRes.tags

    // 2.根据tags获取对应歌单
    const allPromise = []
    for(const tag of tags) {
      const promise = getSongMenuList({
        cat: tag.name,
        limit: 6,
        offset: 0
      })
      allPromise.push(promise)
    }
    Promise.all(allPromise).then(res => {
      this.setData({
        songMenus: res
      })
    })
  }
})
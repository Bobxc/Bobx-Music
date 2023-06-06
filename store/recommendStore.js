import {HYEventStore} from 'hy-event-store'
import {getPlaylistDetail} from '../services/music'

const recommendStore = new HYEventStore({
  state: {
    recommendSongInfo: {}
  },
  actions: {
    fetchRecommendSongsAction(ctx) {
      getPlaylistDetail({id: 3778678}).then(res => {
        ctx.recommendSongInfo = res.playlist
      })
    }
  }
})

export default recommendStore
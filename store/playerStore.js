import {HYEventStore} from 'hy-event-store'
import {getSongDetail, getSongLyric} from '../services/player'
import {parseLyric} from '../utils/parse-lyric'

export const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    id: 0,
    currentSong: {},
    durationTime: 0,
    currentTime: 0,

    lyricInfos: [],
    currentLyricIndex: 0,
    currentLyricText: '',

    isFirstPlay: true,

    playListSongs: [],
    playListIndex: 0,

    playModeIndex: 0, //0:顺序播放  2:单曲循环  3:随机播放
    isPlaying: false
  },
  actions: {
    playMusicWithSongId(ctx, id) {
      ctx.id = id
      ctx.isFirstPlay = true
      if(ctx.currentSong.id !== id) {
        ctx.currentSong = {}
      }

      getSongDetail({ids: id}).then(res => {
        const currentSong = res.songs[0]
        ctx.currentSong = currentSong
        ctx.durationTime = currentSong.dt
      })
      getSongLyric({id}).then(res => {
        const lyricString = res.lrc.lyric
        const lyricInfos = parseLyric(lyricString)
        ctx.lyricInfos = lyricInfos
      })

      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true

      if(ctx.isFirstPlay) {
        ctx.isFirstPlay = false
        this.dispatch('onAudioContextListener')
      }
    },

    onAudioContextListener(ctx) {
      audioContext.onTimeUpdate(() => {
        ctx.currentTime = audioContext.currentTime * 1000

        //  匹配歌词
        if(!ctx.lyricInfos.length) return
        let index = ctx.lyricInfos.length - 1
        for(let i = 0; i < ctx.lyricInfos.length; i++) {
          const lyricItem = ctx.lyricInfos[i]
          if(lyricItem.time > ctx.currentTime) {
            index = i - 1
            break
          }
        }
        if(index === ctx.currentLyricIndex || index === -1) return
        ctx.currentLyricIndex = index
        ctx.currentLyricText = ctx.lyricInfos[index].text
      })
    },
  }
})

export default playerStore
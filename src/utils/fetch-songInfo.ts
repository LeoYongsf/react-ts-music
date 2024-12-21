import { getSongDetail } from "@/api/request"

export function fetchSongInfo(songId: number) {
  return getSongDetail(songId).then((res) => {
    if (!res.length) {
      throw new Error('Song not found')
    }
    return res[0]
  }) // 返回歌曲数据
}

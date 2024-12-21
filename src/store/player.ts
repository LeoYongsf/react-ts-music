import { ILyric, parseLyric } from "@/utils/parse-lyric";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { fetchSongInfo } from "@/utils/fetch-songInfo.ts";
import { getSongLyric } from "@/api/request.ts";
import { SongType } from "@/api/types.ts";

//歌曲点播
export const fetchCurrentSong = async (id: number) => {
  const playingList = usePlayerStore.getState().playingList;
  const findIndex = playingList.findIndex((item) => item.id === id);

  return fetchSongInfo(id).then((song) => {
    if (findIndex === -1) {
      //传递歌曲参数
      const newPlayingList = [...playingList, song];
      playerActions.setCurrentSong(song);
      playerActions.setPlayingList(newPlayingList);
      playerActions.setPlayingIndex(newPlayingList.length - 1);
    } else {
      //歌曲已在列表中
      song = playingList[findIndex];
      playerActions.setCurrentSong(song);
      playerActions.setPlayingIndex(findIndex);
    }

    getSongLyric(id).then((res) => {
      //获取歌词数据
      const lyricString = res.lrc.lyric;
      //歌词转为对象数组
      const lyrics = parseLyric(lyricString);
      playerActions.setLyrics(lyrics);
    });
  });
};

//歌曲添加播放列表
export const addSongToPlayingList = async (id: number) => {
  const playingList = usePlayerStore.getState().playingList;
  const isSongInPlayingList = playingList.some((item) => item.id === id);
  if (isSongInPlayingList) return;

  return fetchSongInfo(id).then((song) => {
    const newPlayingList = [...playingList, song];
    playerActions.setPlayingList(newPlayingList);//更新播放列表
  }).catch((err) => {
    console.error(err);
  });
};

//根据不同播放模式切歌
export const switchSong = async (isNext: boolean) => {
  const { playMode, playingIndex, playingList } = usePlayerStore.getState();
  //根据不同模式计算下一首索引
  let newIndex = playingIndex;
  if (playMode === 1) {
    newIndex = Math.floor(Math.random() * playingList.length);
  } else {
    newIndex = isNext ? playingIndex + 1 : playingIndex - 1;
    if (newIndex > playingList.length - 1) {
      newIndex = 0;
    }
    if (newIndex < 0) {
      newIndex = playingList.length - 1;
    }
  }
  const song = playingList[newIndex];
  playerActions.setCurrentSong(song);
  playerActions.setPlayingIndex(newIndex);

  getSongLyric(song.id).then((res) => {
    //获取歌词数据
    const lyricString = res.lrc.lyric;
    //歌词转换为对象数组
    const lyrics = parseLyric(lyricString);
    playerActions.setLyrics(lyrics);
  });
};

type State = {
  currentSong: SongType;
  lyrics: ILyric[];
  lyricIndex: number;
  playingList: SongType[];
  playingIndex: number;
  playMode: number;
}

const initialState = {
  // 初始化状态
  currentSong: {
    "name": "七月七日晴",
    "id": 2639816894,
    "pst": 0,
    "t": 0,
    "ar": [
      {
        "id": 12213291,
        "name": "张叶蕾",
        "tns": [],
        "alias": []
      }
    ],
    "alia": [],
    "pop": 100,
    "st": 0,
    "rt": "",
    "fee": 8,
    "v": 5,
    "crbt": null,
    "cf": "",
    "al": {
      "id": 251785770,
      "name": "七月七日晴",
      "picUrl": "https://p2.music.126.net/bDJX_fBqjHbc7iofWaqGyQ==/109951170072052546.jpg",
      "tns": [],
      "pic_str": "109951170072052546",
      "pic": 109951170072052540
    },
    "dt": 181791,
    "h": {
      "br": 320000,
      "fid": 0,
      "size": 7273965,
      "vd": -19513,
      "sr": 48000
    },
    "m": {
      "br": 192000,
      "fid": 0,
      "size": 4364397,
      "vd": -16901,
      "sr": 48000
    },
    "l": {
      "br": 128000,
      "fid": 0,
      "size": 2909613,
      "vd": -15218,
      "sr": 48000
    },
    "sq": {
      "br": 875388,
      "fid": 0,
      "size": 19892231,
      "vd": -19501,
      "sr": 48000
    },
    "hr": {
      "br": 1638392,
      "fid": 0,
      "size": 37230626,
      "vd": -19527,
      "sr": 48000
    },
    "a": null,
    "cd": "01",
    "no": 1,
    "rtUrl": null,
    "ftype": 0,
    "rtUrls": [],
    "djId": 0,
    "copyright": 0,
    "s_id": 0,
    "mark": 17716748288,
    "originCoverType": 2,
    "originSongSimpleData": {
      "songId": 307780,
      "name": "七月七日晴",
      "artists": [
        {
          "id": 9950,
          "name": "许慧欣"
        }
      ],
      "albumMeta": {
        "id": 30564,
        "name": "万中选一"
      }
    },
    "tagPicList": null,
    "resourceState": true,
    "version": 5,
    "songJumpInfo": null,
    "entertainmentTags": null,
    "awardTags": null,
    "single": 0,
    "noCopyrightRcmd": null,
    "mv": 0,
    "rtype": 0,
    "rurl": null,
    "mst": 9,
    "cp": 0,
    "publishTime": 0
  },//当前播放歌曲
  lyrics: [],//歌词信息
  lyricIndex: -1,//当前歌词索引
  playingList:
    [
      {
        "name": "七月七日晴",
        "id": 2639816894,
        "pst": 0,
        "t": 0,
        "ar": [
          {
            "id": 12213291,
            "name": "张叶蕾",
            "tns": [],
            "alias": []
          }
        ],
        "alia": [],
        "pop": 100,
        "st": 0,
        "rt": "",
        "fee": 8,
        "v": 5,
        "crbt": null,
        "cf": "",
        "al": {
          "id": 251785770,
          "name": "七月七日晴",
          "picUrl": "https://p2.music.126.net/bDJX_fBqjHbc7iofWaqGyQ==/109951170072052546.jpg",
          "tns": [],
          "pic_str": "109951170072052546",
          "pic": 109951170072052540
        },
        "dt": 181791,
        "h": {
          "br": 320000,
          "fid": 0,
          "size": 7273965,
          "vd": -19513,
          "sr": 48000
        },
        "m": {
          "br": 192000,
          "fid": 0,
          "size": 4364397,
          "vd": -16901,
          "sr": 48000
        },
        "l": {
          "br": 128000,
          "fid": 0,
          "size": 2909613,
          "vd": -15218,
          "sr": 48000
        },
        "sq": {
          "br": 875388,
          "fid": 0,
          "size": 19892231,
          "vd": -19501,
          "sr": 48000
        },
        "hr": {
          "br": 1638392,
          "fid": 0,
          "size": 37230626,
          "vd": -19527,
          "sr": 48000
        },
        "a": null,
        "cd": "01",
        "no": 1,
        "rtUrl": null,
        "ftype": 0,
        "rtUrls": [],
        "djId": 0,
        "copyright": 0,
        "s_id": 0,
        "mark": 17716748288,
        "originCoverType": 2,
        "originSongSimpleData": {
          "songId": 307780,
          "name": "七月七日晴",
          "artists": [
            {
              "id": 9950,
              "name": "许慧欣"
            }
          ],
          "albumMeta": {
            "id": 30564,
            "name": "万中选一"
          }
        },
        "tagPicList": null,
        "resourceState": true,
        "version": 5,
        "songJumpInfo": null,
        "entertainmentTags": null,
        "awardTags": null,
        "single": 0,
        "noCopyrightRcmd": null,
        "mv": 0,
        "rtype": 0,
        "rurl": null,
        "mst": 9,
        "cp": 0,
        "publishTime": 0
      },
      {
        "name": "壁上观",
        "id": 2638631898,
        "pst": 0,
        "t": 0,
        "ar": [
          {
            "id": 1032298,
            "name": "鞠婧祎",
            "tns": [],
            "alias": []
          }
        ],
        "alia": [],
        "pop": 100,
        "st": 0,
        "rt": "",
        "fee": 8,
        "v": 4,
        "crbt": null,
        "cf": "",
        "al": {
          "id": 251403463,
          "name": "壁上观",
          "picUrl": "https://p1.music.126.net/_XBgmnrIqqCea_XWWvbiVw==/109951170062515928.jpg",
          "tns": [],
          "pic_str": "109951170062515928",
          "pic": 109951170062515940
        },
        "dt": 221705,
        "h": {
          "br": 320000,
          "fid": 0,
          "size": 8870445,
          "vd": -42282,
          "sr": 48000
        },
        "m": {
          "br": 192000,
          "fid": 0,
          "size": 5322285,
          "vd": -39699,
          "sr": 48000
        },
        "l": {
          "br": 128000,
          "fid": 0,
          "size": 3548205,
          "vd": -38054,
          "sr": 48000
        },
        "sq": {
          "br": 876136,
          "fid": 0,
          "size": 24280534,
          "vd": -42374,
          "sr": 48000
        },
        "hr": {
          "br": 1642765,
          "fid": 0,
          "size": 45526265,
          "vd": -42273,
          "sr": 48000
        },
        "a": null,
        "cd": "01",
        "no": 1,
        "rtUrl": null,
        "ftype": 0,
        "rtUrls": [],
        "djId": 0,
        "copyright": 0,
        "s_id": 0,
        "mark": 17716748288,
        "originCoverType": 0,
        "originSongSimpleData": null,
        "tagPicList": null,
        "resourceState": true,
        "version": 4,
        "songJumpInfo": null,
        "entertainmentTags": null,
        "awardTags": null,
        "single": 0,
        "noCopyrightRcmd": null,
        "mv": 0,
        "rtype": 0,
        "rurl": null,
        "mst": 9,
        "cp": 7001,
        "publishTime": 0
      }
    ],//播放列表
  playingIndex: -1,//在播放列表中的索引
  playMode: 0//循环模式：0(顺序播放),1(随机播放),2(单曲循环)
};

export const usePlayerStore = create(
  immer<State>(() => ({
    ...initialState
  }))
);

//更新状态的方法
export const playerActions = {
  setCurrentSong: (song: any) => usePlayerStore.setState({ currentSong: song }),
  setLyrics: (lyrics: ILyric[]) => usePlayerStore.setState({ lyrics: lyrics }),
  setLyricIndex: (index: number) => usePlayerStore.setState({ lyricIndex: index }),
  setPlayingList: (songs: any[]) => usePlayerStore.setState({ playingList: songs }),
  setPlayingIndex: (index: number) => usePlayerStore.setState({ playingIndex: index }),
  setPlayMode: (mode: number) => usePlayerStore.setState({ playMode: mode })
};

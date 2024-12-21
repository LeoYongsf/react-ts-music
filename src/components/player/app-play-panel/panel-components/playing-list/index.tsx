import classNames from 'classnames'
import { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { formatTime } from '@/utils/format'
import { fetchCurrentSong, usePlayerStore } from "@/store/player.ts";
import { useShallow } from "zustand/react/shallow";
import "./style.scss"

interface IProps {
  children?: ReactNode
}

const PlayList: FC<IProps> = () => {
  const { playList, currentSongIndex } = usePlayerStore(
    useShallow((state) => ({
      playList: state.playingList,
      currentSongIndex: state.playingIndex
    }))
  )

  const handlePlayMusic = (id: number) => {
    fetchCurrentSong(id)
  }
  return (
    <div className="playlist-wrapper">
      {playList.map((item, index) => {
        return (
          <div
            key={item.id}
            className={classNames('play-item', { active: currentSongIndex === index })}
            onClick={() => handlePlayMusic(item.id)}
          >
            <div className="left">{item.name}</div>
            <div className="right">
              <span className="singer">{item.ar[0].name}</span>
              <span className="duration">{formatTime(item.dt)}</span>
              <span className="sprite_playlist link"></span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(PlayList)

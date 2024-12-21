import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./style.scss";
import { playerActions, usePlayerStore } from "@/store/player.ts";
import { useShallow } from "zustand/react/shallow";

interface IProps {
  children?: ReactNode;
}

const PanelHeader: FC<IProps> = () => {
  const { playingList, currentSong } = usePlayerStore(
    useShallow((state) => ({
      playingList: state.playingList,
      currentSong: state.currentSong,
    }))
  );

  const handleClear = () => {
    playerActions.setPlayingList([currentSong]);
    playerActions.setPlayingIndex(0);
  };

  return (
    <div className="panel-header-wrapper">
      <div className="header-left">
        <h3>播放列表({playingList.length})</h3>
        <div className="operator">
          <button>
            <i className="sprite_playlist icon favor"></i>
            收藏全部
          </button>
          <button onClick={handleClear}>
            <i className="sprite_playlist icon remove"></i>
            清除
          </button>
        </div>
      </div>
      <div className="header-right">{currentSong.name}</div>
    </div>
  );
};

export default memo(PanelHeader);

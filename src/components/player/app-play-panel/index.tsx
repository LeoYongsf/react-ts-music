import { FC, memo, ReactNode } from "react";
import PanelHeader from "@/components/player/app-play-panel/panel-components/panel-header";
import "./style.scss";
import PlayList from "@/components/player/app-play-panel/panel-components/playing-list";
import SongInfo from "@/components/player/app-play-panel/panel-components/song-info";

interface IProps {
  children?: ReactNode;
}

const PlayPanel: FC<IProps> = () => {
  return (
    <div className="play-panel-wrapper">
      <PanelHeader />
      <div className="main">
        <PlayList />
        <SongInfo />
      </div>
    </div>
  );
};

export default memo(PlayPanel);

import { FC, memo, ReactNode } from "react";
import { addSongToPlayingList, fetchCurrentSong } from "@/store/player.ts";
import { Button, message } from "antd";
import { formatTime } from "@/utils/format.ts";
import { HeartOutlined, PlayCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";

interface IProps {
  children?: ReactNode;
  albumData: any;
}

const SongList: FC<IProps> = (props) => {
  const { albumData } = props;
  const { tracks = [] } = albumData;

  function handlePlayClick(id: number) {
    fetchCurrentSong(id);
  }

  function handleAddClick(id: number) {
    addSongToPlayingList(id);
    message.success("添加至播放列表");
  }

  function handleClick() {
    message.warning("收藏功能尚未完成");
  }

  return (
    <div className="list-item-wrapper wrap-v1">
      {tracks.map((item: any, index: number) => {
        return (
          <div className="item" key={item.id}>
            <div className="index">{index + 1}</div>
            <div className="info">
              <span className="name">{item.name}</span>
              <span className="singer">{item.ar[0].name}</span>
              <span className="duration">{formatTime(item.dt)}</span>
              <div className="operator">
                <Button type="primary" icon={<PlayCircleOutlined />}
                        onClick={() => handlePlayClick(item.id)}></Button>
                <Button type="primary" icon={<PlusSquareOutlined />}
                        onClick={() => handleAddClick(item.id)}></Button>
                <Button type="primary" icon={<HeartOutlined />}
                        onClick={handleClick}></Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(SongList);

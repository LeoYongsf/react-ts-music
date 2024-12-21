import { getImageSize } from "@/utils/format";
import { FC, memo, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { addSongToPlayingList, fetchCurrentSong } from "@/store/player.ts";
import { message } from "antd";

interface IProps {
  children?: ReactNode;
  itemData: any;
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props;
  const { tracks = [] } = itemData;

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
    <div className="ranking-item-wrapper">
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <button className="sprite_02 btn1 play"></button>
          <button className="sprite_02 btn1 favor"></button>
        </div>
      </div>
      <div className="list">
        {
          tracks.slice(0, 10).map((item: any, index: number) => {
            return (
              <div className="item" key={item.id}>
                <div className="index">{index + 1}</div>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="operator">
                    <button className="btn2 sprite_02 play"
                            onClick={() => handlePlayClick(item.id)}></button>
                    <button className="btn2 sprite_icon2 add"
                            onClick={() => handleAddClick(item.id)}></button>
                    <button className="btn2 sprite_02 favor"
                            onClick={handleClick}></button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
      <div className="footer">
        <Link to="/rank">查看全部 &gt;</Link>
      </div>
    </div>
  );
};

export default memo(TopRankingItem);

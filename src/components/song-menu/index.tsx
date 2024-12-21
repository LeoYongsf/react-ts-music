import { FC, memo, ReactNode } from "react";
import "./style.scss";
import { formatCount, getImageSize } from "@/utils/format";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  itemData: any;
}

const SongMenu: FC<IProps> = (props) => {
  const { itemData } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/album/${itemData.id}`);
  };

  return (
    <div className="menu-wrapper" onClick={handleClick}>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 200)} alt="" />
        <div className="cover">
          <div className="info sprite_cover">
            <span className="count">
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </div>
  );
};

export default memo(SongMenu);

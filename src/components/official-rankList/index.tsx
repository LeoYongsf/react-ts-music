import { RankListType } from "@/api/types";
import { FC, memo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  list: RankListType[];
}

const OfficialRankList: FC<IProps> = ({ list }) => {
  const navigate = useNavigate();

  const gotoDetail = (id: string) => {
    navigate(`/album/${id}`);
  };

  return (
    <ul className="official-list">
      {list.map((item) => (
        <li key={item.id} onClick={() => gotoDetail(item.id)}>
          <img src={item.coverImgUrl} alt="cover" />
          <ul className="top3-of-list">
            {item.tracks.map((item, index) => (
              <li key={item.first}>
                {`${index + 1}. ${item.first} - ${item.second}`}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>);
};

export default memo(OfficialRankList);

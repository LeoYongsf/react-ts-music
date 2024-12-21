import { FC, ReactNode, memo } from "react";
import { RankListType } from "@/api/types.ts";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: ReactNode;
  list: RankListType[];
}

const GlobalRankList: FC<IProps> = ({ list }) => {
  const navigate = useNavigate();

  const gotoDetail = (id: string) => {
    navigate(`/album/${id}`);
  };

  return (
    <ul className="global-list">
      {list.map((item) => (
        <li key={item.id} onClick={() => gotoDetail(item.id)}>
          <img src={item.coverImgUrl} alt="cover" />
          <span className="describe">{item.updateFrequency}</span>
        </li>
      ))}
    </ul>);
};

export default memo(GlobalRankList);

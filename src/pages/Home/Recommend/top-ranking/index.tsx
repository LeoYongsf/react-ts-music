import { FC, memo, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAlbumDetailRequest } from "@/api/request.ts";
import AreaHeader from "@/components/area_header";
import TopRankingItem from "../top-ranking-item";
import "./style.scss"

interface IProps {
  children?: ReactNode;
}

function useTopRanking(ids: string[]) {
  return useQuery({
    queryKey: ["topRanking", ids],
    queryFn: () => {
      return Promise.all(ids.map((id) => getAlbumDetailRequest(id))); // 调用时传入 id
    },
    staleTime: Infinity
  });
}


const TopRanking: FC<IProps> = () => {
  const rankingIds = ["19723756", "3779629", "2884035"];
  const { data } = useTopRanking(rankingIds);
  const playlists = data || [];

  return (
    <div className="top-ranking-wrapper">
      <AreaHeader title="榜单" moreLink="/home/rank" />
      <div className="content">
        {
          playlists.map((item) => {
              return (
                <TopRankingItem key={item.id} itemData={item} />
              );
            }
          )
        }
      </div>
    </div>
  );
};

export default memo(TopRanking);

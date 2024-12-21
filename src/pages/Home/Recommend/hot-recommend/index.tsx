import { FC, memo, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecommendListData } from "@/api/request.ts";
import SongMenu from "@/components/song-menu";
import AreaHeader from "@/components/area_header";
import "./style.scss";

interface IProps {
  children?: ReactNode;
}

function useHotRecommend() {
  return useQuery({
    queryKey: ["hotRecommend"],
    queryFn: getRecommendListData,
    staleTime: 60 * 1000 * 10
  });
}

const HotRecommend: FC<IProps> = () => {
  const { data } = useHotRecommend();
  const recommendList = data?.result || [];

  return (
    <div className="hot-recommend-wrapper">
      <AreaHeader
        title="热门推荐"
      />
      <div className="recommend-list">
        {
          recommendList.map((item) => {
            return (
              <SongMenu key={item.id} itemData={item} />
            );
          })
        }
      </div>
    </div>
  );
};

export default memo(HotRecommend);

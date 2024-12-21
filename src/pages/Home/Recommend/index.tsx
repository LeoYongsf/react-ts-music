import { FC, memo, ReactNode } from "react";
import TopBanner from "@/pages/Home/Recommend/top-banners";
import HotRecommend from "@/pages/Home/Recommend/hot-recommend";
import TopRanking from "@/pages/Home/Recommend/top-ranking";

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = () => {
  return (
    <div className="recommend-wrapper">
      <TopBanner />
      <div className="wrap-v1">
        <HotRecommend />
        <TopRanking/>
      </div>
    </div>
  );
};

export default memo(Recommend);

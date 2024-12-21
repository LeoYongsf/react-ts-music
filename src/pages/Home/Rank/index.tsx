import { FC, memo, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRankListData } from "@/api/request.ts";
import OfficialRankList from "@/components/official-rankList";
import GlobalRankList from "@/components/global-ranklist";

interface IProps {
  children?: ReactNode;
}

const useRankList = () => {
  return useQuery({
    queryKey: ["rankList"],
    queryFn: getRankListData,
    staleTime: Infinity
  });
};

const Rank: FC<IProps> = () => {
  const { data, isPending, isError } = useRankList();
  if (isPending) return;
  if (isError) return;
  const officialList = data.list.filter((item) => item.tracks.length !== 0);
  const globalList = data.list.filter((item) => item.tracks.length === 0);

  return (
    <div className="content">
      <div className="official">
        <h1 key={1} className="tittle">
          官方榜
        </h1>
        <OfficialRankList list={officialList} />
      </div>
      <div className="global">
        <h1 key={2} className="tittle">
          全球榜
        </h1>
        <GlobalRankList list={globalList} />
      </div>
    </div>
  );
};

export default memo(Rank);

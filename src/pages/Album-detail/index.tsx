import { FC, memo, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAlbumDetailRequest } from "@/api/request.ts";
import { getImageSize } from "@/utils/format.ts";
import SongList from "@/components/song-list";
import { Space } from "antd";
import { LikeOutlined, CommentOutlined, HeartOutlined } from "@ant-design/icons";

interface IProps {
  children?: ReactNode;
}

function useAlbumDetail(id: string) {
  return useQuery({
    queryKey: ["AlbumDetail", id],
    queryFn: () => getAlbumDetailRequest(id),
    staleTime: Infinity
  });
}

const AlbumDetail: FC<IProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError } = useAlbumDetail(id as string);
  if (isPending) return;
  if (isError) return;

  let bgImgUrl = data.coverImgUrl;
  if (bgImgUrl) {
    bgImgUrl = bgImgUrl + "?imageView&blur=40x20";
  }

  return (
    <div className="album-wrapper">
      <div className="album-header"
           style={{
             background: `url('${bgImgUrl}') center center / 6000px`
           }}>
        <img src={getImageSize(data.coverImgUrl, 200)} alt="" />
        <span className="name">{data.name}</span>
        <div className="operate-menu">
          <Space direction="vertical" align="center">
            <LikeOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
            <span>点赞</span>
          </Space>
          <Space direction="vertical" align="center">
            <HeartOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
            <span>收藏</span>
          </Space>
          <Space direction="vertical" align="center">
            <CommentOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
            <span>评论</span>
          </Space>
        </div>
      </div>
      <div className="album-content wrap-v1">
        <SongList albumData={data} />
      </div>
    </div>
  );
};

export default memo(AlbumDetail);

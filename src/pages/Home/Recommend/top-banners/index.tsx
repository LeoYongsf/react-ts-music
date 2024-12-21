import { ElementRef, FC, memo, ReactNode, useRef, useState } from "react";
import { Carousel } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getBannerData } from "@/api/request";
import "./style.scss";

interface IProps {
  children?: ReactNode;
}

function useBanner() {
  return useQuery({
    queryKey: ["banner"],
    queryFn: getBannerData,
  });
}

const TopBanner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null);
  const { data, isPending, isError } = useBanner();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const banners = data.banners;

  function handleBeforeChange(next: number) {
    setCurrentIndex(next);
  }

  //轮播图切换
  function handleClickPrev() {
    bannerRef.current?.prev();
  }

  function handleClickNext() {
    bannerRef.current?.next();
  }

  // 获取背景
  let bgImageUrl = banners[currentIndex]?.imageUrl;
  if (bgImageUrl) {
    bgImageUrl = bgImageUrl + "?imageView&blur=40x20";
  }

  return (
    <div className="top-banner-wrapper"
         style={{
           background: `url('${bgImageUrl}') center center / 6000px`
         }}
    >
      <div className="banner wrap-v2">
        <div className="banner-left">
          <Carousel autoplay effect="fade" ref={bannerRef} beforeChange={(_, next) => handleBeforeChange(next)}
                    autoplaySpeed={5000}>
            {banners.map((item) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="banner-right"></div>
        <div className="banner-control">
          <button className="btn left" onClick={handleClickPrev}></button>
          <button className="btn right" onClick={handleClickNext}></button>
        </div>
      </div>
    </div>
  );
};

export default memo(TopBanner);

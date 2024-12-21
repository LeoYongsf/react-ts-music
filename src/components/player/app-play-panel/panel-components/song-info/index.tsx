import { FC, memo, ReactNode, useEffect, useRef } from "react";
import { scrollTo } from "@/utils/lyric-scroll";
import classNames from "classnames";
import { usePlayerStore } from "@/store/player.ts";
import { useShallow } from "zustand/react/shallow";
import "./style.scss"

interface IProps {
  children?: ReactNode;
}

const SongInfo: FC<IProps> = () => {
  const { lyrics, lyricIndex } = usePlayerStore(
    useShallow((state) => ({
      lyrics: state.lyrics,
      lyricIndex: state.lyricIndex
    }))
  );

  const panelRef = useRef<HTMLDivElement>(null);

  //歌词滚动
  useEffect(() => {
    if (lyricIndex > 0 && lyricIndex < 3) return;
    panelRef.current && scrollTo(panelRef.current,
      (lyricIndex - 3) * 32,
      300);
  }, [lyricIndex]);

  return (
    <div className="lyric-wrapper" ref={panelRef}>
      <div className="lyric-content">
        {lyrics.map((item, index) => {
          return (
            <div
              className={classNames("lyric-item", { active: index === lyricIndex })}
              key={item.time}>
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(SongInfo);

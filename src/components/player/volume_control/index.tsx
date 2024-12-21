import { FC, memo, ReactNode, useRef } from "react";
import "./style.scss";

interface IProps {
  children?: ReactNode;
  audioRef: React.RefObject<HTMLAudioElement>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const VolumeControl: FC<IProps> = ({ audioRef, volume, setVolume }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  // 鼠标拖动更新音量
  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    // 初始化滑动
    updateVolume(event || new MouseEvent("mousemove"));
  }

  function handleMouseMove(event: MouseEvent) {
    updateVolume(event);
  }

  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function updateVolume(event: MouseEvent | React.MouseEvent) {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newVolume = Math.min(
        Math.max(0, (rect.bottom - event.clientY) / rect.height),
        1
      );
      setVolume(newVolume * 100);
      audioRef.current!.volume = newVolume;
    }
  }

  return (
    <div className="volume-control">
      <div className="container playbar_bng">
        <div
          className="vlm-slider"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
        >
          <div className="track" style={{ height: `${volume}%` }} />
          <div className="thumb sprite_icon" style={{ bottom: `${volume}%` }} />
        </div>
      </div>
    </div>
  );
};

export default memo(VolumeControl);

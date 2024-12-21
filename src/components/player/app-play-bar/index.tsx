import { FC, memo, ReactNode, useEffect, useRef, useState } from "react";
import "./style.scss";
import { formatTime, getImageSize, getSongPlayUrl } from "@/utils/format";
import { message, Slider } from "antd";
import { Link } from "react-router-dom";
import VolumeControl from "@/components/player/volume_control";
import { playerActions, switchSong, usePlayerStore } from "@/store/player.ts";
import { useShallow } from "zustand/react/shallow";
import PlayPanel from "@/components/player/app-play-panel";

interface IProps {
  children?: ReactNode;
}

const AppPlayBar: FC<IProps> = () => {
  //组件状态
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const [volume, setVolume] = useState(50);
  const [isShowVolume, setIsShowVolume] = useState(false);
  const [isShowPanel, setIsShowPanel] = useState(false);
  const [isShowLyrics, setIsShowLyrics] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  //获取zustand状态信息
  const { currentSong, lyrics, lyricIndex, playMode, playingList } = usePlayerStore(
    useShallow((state) =>
      ({
        currentSong: state.currentSong,
        lyrics: state.lyrics,
        lyricIndex: state.lyricIndex,
        playMode: state.playMode,
        playingList: state.playingList
      }))
  );

  // 歌曲点击播放
  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id);
    audioRef.current?.play()
      .then(() => {
        setIsPlaying(true);
        console.log("播放成功");
      })
      .catch((err) => {
        setIsPlaying(false);
        console.log(err);
      });
    setDuration(currentSong.dt);
  }, [currentSong]);

  //播放进度处理
  function handleTimeUpate() {
    // 获取当前播放时间
    const currentTime = audioRef.current!.currentTime * 1000;
    //计算当前播放进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
      setCurrentTime(currentTime);
    }

    //根据播放时间匹配歌词
    let index = lyrics.length - 1;
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i];
      if (lyric.time > currentTime) {
        index = i - 1;
        break;
      }
    }
    //匹配歌词的index
    if (lyricIndex === index || index === -1) {
      return;
    }
    playerActions.setLyricIndex(index);

    //展示对应歌词
    if (!isShowLyrics) {
      message.destroy("lyric");
    }

    isShowLyrics && message.open({
      content: lyrics[index].text,
      key: "lyric",
      duration: 0
    });
  }

  //循环播放（根据模式）
  function handleTimeEnd() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play();
    } else {
      switchSong(true);
    }
  }

  // 组件内部控制
  function handlePlayBtnClick() {
    // 控制播放与暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false));
    // 改变isPlaying状态
    setIsPlaying(!isPlaying);
  }

  //进度条点击处理
  function handleSliderChange(value: number) {
    const currentTime = (value / 100) * duration;
    audioRef.current!.currentTime = currentTime / 1000;
    setCurrentTime(currentTime);
    setProgress(value);
    setIsSliding(false);
  }

  // 进度条滑动处理
  function handleSliderSliding(value: number) {
    setIsSliding(true);
    setProgress(value);
    const currentTime = (value / 100) * duration;
    setCurrentTime(currentTime);
  }

  // 切歌
  function handleChangeMusic(isNext = true) {
    switchSong(isNext);
  }

  function handleShowVolume() {
    setIsShowVolume(!isShowVolume);
  }

  //播放模式切换
  function handleChangePlayMode() {
    let newPlayMode = playMode + 1;
    if (newPlayMode > 2) {
      newPlayMode = 0;
    }
    playerActions.setPlayMode(newPlayMode);
  }

  //播放列表
  function handleShowPanel() {
    setIsShowPanel(!isShowPanel);
    setIsShowLyrics(isShowPanel);
  }

  return (
    <div className="play-bar-wrapper sprite_playbar">
      <>
        <div className="content wrap-v2">
          <div className="bar-control">
            <button className="btn sprite_playbar prev" onClick={() => handleChangeMusic(false)}></button>
            <button className={`btn sprite_playbar play ${isPlaying && "is-playing"}`}
                    onClick={handlePlayBtnClick}></button>
            <button className="btn sprite_playbar next" onClick={() => handleChangeMusic()}></button>
          </div>
          <div className="bar-play-info">
            <Link to="/player">
              <img src={getImageSize(currentSong?.al?.picUrl, 34)} alt="" />
            </Link>
            <div className="info">
              <div className="song">
                <span className="song-name">{currentSong.name}</span>
                <span className="singer-name">{currentSong.ar?.[0]?.name}</span>
              </div>

              <div className="progress">
                <Slider
                  step={0.5}
                  value={progress}
                  tooltip={{ formatter: null }}
                  onChange={handleSliderSliding}
                  onAfterChange={handleSliderChange}
                />
                <div className="time">
                  <span className="current">{formatTime(currentTime)}</span>
                  <span className="divider">/</span>
                  <span className="duration">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bar-operator">
            <div className="left">
              <button className="btn pip"></button>
              <button className="btn sprite_playbar favor"></button>
              <button className="btn sprite_playbar share"></button>
            </div>
            <div className="right sprite_playbar">
              {/*音量控制滑块*/}
              {isShowVolume && <VolumeControl audioRef={audioRef} volume={volume} setVolume={setVolume} />}
              <button className="btn sprite_playbar volume" onClick={handleShowVolume}></button>
              <button className={`btn sprite_playbar loop mode-${playMode}`}
                      onClick={handleChangePlayMode}></button>
              <button className="btn sprite_playbar playlist" onClick={handleShowPanel}>
                {playingList.length}
              </button>
            </div>
          </div>
        </div>
        {/*播放组件*/}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpate}
          onEnded={handleTimeEnd}
        >
        </audio>
      </>
      {isShowPanel && <PlayPanel/>}
    </div>
  );
};

export default memo(AppPlayBar);

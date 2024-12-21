export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + "万"
  } else {
    return count;
  }
}

export function getImageSize(
  // 设置图片大小
  imageUrl: string,
  width: number,
  height: number = width) {
  return imageUrl + `?param=${width}x${height}`
}

export function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export function formatTime(time: number) {
  // 格式化时间
  const times = time / 1000;
  const minutes = Math.floor(times / 60);
  const seconds = Math.floor(times) % 60;
  const formatMinute = String(minutes).padStart(2, '0');
  const formatSecond = String(seconds).padStart(2, '0');
  return `${formatMinute}:${formatSecond}`;
}

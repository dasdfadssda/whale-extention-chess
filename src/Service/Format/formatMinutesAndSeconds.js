// 시간 표기 변환 함수 (00:00)
export const formatMinutesAndSeconds = (time) => {
    const formattedSeconds = String(Math.floor(time % 60)).padStart(2, "0");
    const formattedMinutes = String(Math.floor(time / 60)).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
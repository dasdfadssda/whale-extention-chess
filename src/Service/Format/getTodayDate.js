// 오늘 날짜를 가져오는 함수
export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해준 후 2자리로 패딩
    const day = String(today.getDate()).padStart(2, "0"); // 일은 2자리로 패딩
    const todayDate = `${year}-${month}-${day}`;
    return todayDate;
  };
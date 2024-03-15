import { getDoc, doc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { getTodayDate } from "../Format/getTodayDate";

// 오늘 날짜의 count 값을 가져오는 함수
export const getTodayCount = async () => {
  const todayDate = getTodayDate();
  const countNumRef = doc(dbService, "GameCountNum", todayDate); // 오늘 날짜를 문서 ID로 하는 컬렉션 참조 생성

  try {
    const docSnap = await getDoc(countNumRef); // 문서 스냅샷 가져오기

    if (docSnap.exists()) {
      // 문서가 존재하는 경우
      const count = docSnap.data().count; // count 필드의 값을 가져옴
      console.log("오늘 날짜의 count 값 가져오기 성공");
      return count;
    } else {
      console.log("오늘 날짜의 count 값이 존재하지 않습니다.");
      return 0; // 값이 없는 경우 0을 반환
    }
  } catch (error) {
    console.error("오늘 날짜의 count 값 가져오기 실패:", error);
    return 0; // 오류가 발생한 경우 0을 반환
  }
};

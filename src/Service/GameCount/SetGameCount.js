import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { getTodayDate } from "../Format/getTodayDate";

// GameCountNum 컬렉션을 업데이트하는 함수
export const updateGameCountNum = async () => {
  const todayDate = getTodayDate();
  const countNumRef = doc(dbService, "GameCountNum", todayDate); // 오늘 날짜를 문서 ID로 하는 컬렉션 참조 생성

  try {
    const docSnap = await getDoc(countNumRef); // 문서 스냅샷 가져오기

    if (docSnap.exists()) { // 문서가 존재하는 경우
      await updateDoc(countNumRef, { count: docSnap.data().count + 1 }); // count 필드의 값을 1 증가시켜 업데이트
      console.log("GameCountNum 컬렉션 업데이트 성공");
    } else {
      await setDoc(countNumRef, { count: 1 }); // 새로운 문서를 생성하여 count 필드를 1로 설정
      console.log("GameCountNum 컬렉션에 새로운 문서 추가 성공");
    }
  } catch (error) {
    console.error("GameCountNum 컬렉션 업데이트 실패:", error);
  }
};

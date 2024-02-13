import { doc, setDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

// Firestore에 점수 정보를 저장하는 함수
export const saveScoreToFirestore = async (difficulty, name, time) => {
  const userId = localStorage.getItem("id");

  if (!userId) {
    console.error("로그인 정보가 없습니다.");
    return;
  }

  try {
    await setDoc(doc(dbService, `${difficulty}Score`, userId), {
      name: name,
      time: time,
    });
    console.log("Firestore에 점수 정보 저장 성공");
  } catch (error) {
    console.error("Firestore에 점수 정보 저장 실패:", error);
  }
};

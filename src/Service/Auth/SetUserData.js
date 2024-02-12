import { getDoc, setDoc, doc } from "firebase/firestore";
import { dbService } from "../../fbase";

// Firestore에 사용자 정보 저장
export const saveUserToFirebase = async (userToSave, userId) => {
  const userRef = doc(dbService, "User", userId); // 사용자 문서 참조 생성
  localStorage.setItem("id", userId);

  try {
    const docSnap = await getDoc(userRef); // 문서 스냅샷 가져오기

    if (!docSnap.exists()) { // 문서가 존재하지 않는 경우
      await setDoc(userRef, userToSave); // 사용자 정보 저장
      console.log("User collection에 사용자 정보 저장 성공");
    } else {
      console.log("이미 해당 ID를 가진 사용자 정보가 존재합니다.");
    }
  } catch (error) {
    console.error("Firestore에 사용자 정보 저장 실패:", error);
  }
};

import { getDoc, setDoc, doc } from "firebase/firestore";
import { dbService } from "../../fbase";
import { fetchUserFromFirebase } from "./GetUserData";



// Firestore에 사용자 정보 저장
export const saveUserToFirebase = async (userToSave, userId, setUser) => {
  // 사용자 문서 참조 생성
  const userRef = doc(dbService, "User", userId); 
  localStorage.setItem("id", userId);

  try {
    const docSnap = await getDoc(userRef); // 문서 스냅샷 가져오기

    if (!docSnap.exists()) { // 문서가 존재하지 않는 경우
      await setDoc(userRef, userToSave); // 사용자 정보 저장
      console.log("User collection에 사용자 정보 저장 성공");

      // 각 difficulty에 대한 점수 정보 추가
      ["Easy", "Normal", "Hard"].forEach(async (difficulty) => {
        try {
          await setDoc(doc(dbService, `${difficulty}Score`, userId), {
            name: userToSave.name,
            time: 0, // 시간 초기화
            id: userId
          });
          console.log(`${difficulty}Score 컬렉션에 사용자 정보 저장 성공`);
        } catch (error) {
          console.error(`${difficulty}Score 컬렉션에 사용자 정보 저장 실패:`, error);
        }
      });

    } else {
      console.log("이미 해당 ID를 가진 사용자 정보가 존재합니다.");
    }
    const userData = await fetchUserFromFirebase(userId);
    setUser(userData);
    console.log("로그인 하면 무조건 userData에 저장",userData);
  } catch (error) {
    console.error("Firestore에 사용자 정보 저장 실패:", error);
  }
};

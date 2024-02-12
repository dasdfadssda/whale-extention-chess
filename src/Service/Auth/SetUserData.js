import { setDoc, doc } from "firebase/firestore";
import { dbService } from "../../fbase";

// Firestore에 사용자 정보 저장
export const saveUserToFirebase = async (userToSave, userId) => {
  const docRef = await setDoc(doc(dbService, "User", userId), userToSave);
  localStorage.setItem("id", userId);

  if (docRef) {
    console.log("User collection에 사용자 정보 저장 성공");
  }
};

// fetchUserFromFirebase.js
import { doc, getDoc } from "firebase/firestore"; 
import { dbService } from "../../fbase"; 

// Firestore에서 사용자 정보 읽기
export const fetchUserFromFirebase = async (userId) => {
  const docRef = doc(dbService, "User", userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.error("No such document!");
  }
}

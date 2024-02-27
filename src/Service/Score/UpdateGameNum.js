import { doc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

// Firestore에 점수 정보를 저장하는 함수
export const updatedGameNum = async (difficulty, user, time) => {
  const userId = localStorage.getItem("id");
  const UserTime = time;
  console.log("저장되는 정보 : ", difficulty, user.name, UserTime);

  if (!userId) {
    console.error("로그인 정보가 없습니다.");
    return;
  }

  try {
    // 사용자의 게임 정보 업데이트
    const userDocRef = doc(dbService, "User", userId);

    let updatedGameInfo = { ...user.gameInfo };
    updatedGameInfo[difficulty].gameNum += 1; // gameNum을 +1 증가시킴

    // 난이도에 따라서 Normal과 Hard의 access를 업데이트
    if (difficulty === "Easy" && updatedGameInfo[difficulty].gameNum >= 4) {
      updatedGameInfo["Normal"].access = true;
    } else if (
      difficulty === "Normal" &&
      updatedGameInfo[difficulty].gameNum >= 2
    ) {
      updatedGameInfo["Hard"].access = true;
    }

    await updateDoc(userDocRef, { gameInfo: updatedGameInfo });
    console.log("사용자의 게임 숫자와 접근 권한만 성공");

  } catch (error) {
    console.error(
      "Firestore에 점수 정보 저장 및 사용자의 게임 정보 업데이트 실패:",
      error
    );
  }
};

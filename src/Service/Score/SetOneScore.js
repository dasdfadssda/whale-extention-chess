import { doc, setDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

// 사용자의 게임 정보를 업데이트하는 함수
export const updateUserGameInfo = async (difficulty, user, time) => {
  const userId = localStorage.getItem("id");
  const UserTime = time;

  if (!userId) {
    console.error("로그인 정보가 없습니다.");
    return;
  }

  try {
    const userDocRef = doc(dbService, "User", userId);
    let updatedGameInfo = { ...user.gameInfo };
    updatedGameInfo[difficulty].time = UserTime; // 새로운 시간 선언
    updatedGameInfo[difficulty].gameNum += 1; // gameNum을 +1 증가시킴

    // 난이도에 따라서 Normal과 Hard의 access를 업데이트
    if (difficulty === "Easy" && updatedGameInfo[difficulty].gameNum >= 3) {
      updatedGameInfo["Normal"].access = true;
    } else if (
      difficulty === "Normal" &&
      updatedGameInfo[difficulty].gameNum >= 5
    ) {
      updatedGameInfo["Hard"].access = true;
    }

    await updateDoc(userDocRef, { gameInfo: updatedGameInfo });
    console.log("사용자의 게임 정보 업데이트 성공");
  } catch (error) {
    console.error(
      "사용자의 게임 정보 업데이트 실패:",
      error
    );
  }
};

// Firestore에 점수 정보를 저장하는 함수
export const saveScoreToFirestore = async (difficulty, user, time) => {
  const userId = localStorage.getItem("id");
  const UserTime = time;

  if (!userId) {
    console.error("로그인 정보가 없습니다.");
    return;
  }

  try {
    // ${difficulty}Score에 정보 저장
    await setDoc(doc(dbService, `${difficulty}Score`, userId), {
      name: user.name,
      time: UserTime,
      id: userId,
    });
    console.log(`Firestore ${difficulty}Score에 점수 정보 저장 성공`);
  } catch (error) {
    console.error(
      "Firestore에 점수 정보 저장 실패:",
      error
    );
  }
};

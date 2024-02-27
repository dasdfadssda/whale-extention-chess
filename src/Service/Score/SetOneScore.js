import { doc, setDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../fbase";

// Firestore에 점수 정보를 저장하는 함수
export const saveScoreToFirestore = async (difficulty, user, time) => {
  const userId = localStorage.getItem("id");
  console.log("저장되는 정보 : ", difficulty, user.name, time);

  if (!userId) {
    console.error("로그인 정보가 없습니다.");
    return;
  }

  try {
    // 사용자의 게임 정보 업데이트
    const userDocRef = doc(dbService, "User", userId);

    let updatedGameInfo = { ...user.gameInfo };
    updatedGameInfo[difficulty].time = time; // 새로운 시간 선언
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
    console.log("사용자의 게임 정보 업데이트 성공");

    // ${difficulty}Score에 정보 저장
    await setDoc(doc(dbService, `${difficulty}Score`, userId), {
      name: user.name,
      time: time,
      id: userId,
    });
    console.log(`Firestore ${difficulty}Score에 점수 정보 저장 성공`);
  } catch (error) {
    console.error(
      "Firestore에 점수 정보 저장 및 사용자의 게임 정보 업데이트 실패:",
      error
    );
  }
};

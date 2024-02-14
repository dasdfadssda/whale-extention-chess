import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      if (userData && userData.gameInfo && userData.gameInfo[difficulty]) {
        const currentGameInfo = userData.gameInfo[difficulty];
        let updatedGameInfo = { ...userData.gameInfo };

        // 현재 게임 시간이 기존 시간거나 첫 시작을 경우
        if (time < currentGameInfo.time || currentGameInfo.time === 0) {
          // 게임 정보 업데이트
          updatedGameInfo[difficulty].time = time; // 현재 게임 시간으로 업데이트

          // ${difficulty}Score에 정보 저장
          await setDoc(doc(dbService, `${difficulty}Score`, userId), {
            name: user.name,
            time: time,
          });
          console.log(`Firestore ${difficulty}Score에 점수 정보 저장 성공`);
        }
        // gameNum을 +1 증가시킴
        updatedGameInfo[difficulty].gameNum += 1;

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
      } else {
        console.error("게임 정보가 존재하지 않습니다.");
      }
    } else {
      console.error("사용자 정보가 존재하지 않습니다.");
    }
  } catch (error) {
    console.error(
      "Firestore에 점수 정보 저장 및 사용자의 게임 정보 업데이트 실패:",
      error
    );
  }
};

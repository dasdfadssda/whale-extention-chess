// 움직임 가능한 말의 알제브레익로 변환하는 함수
export const convertMoves = (legalMoves) => {
  return legalMoves.map((move) => {
    // "x"를 포함하는 경우 "x"를 제거합니다.
    if (move.includes("x")) {
      move = move.replace("x", "");
    }

    // "+" 또는 "#"을 포함하는 경우 처리
    if (move.includes("+") || move.includes("#")) {
      // "+"나 "#"을 제거한 후 반환
      move = move.replace(/[+#]/g, "");
    }

    // 폰이 다른 말을 먹었을 경우
    if (move[0] === move[0].toLowerCase() && move.length === 3) {
      move = move.slice(-2);
    }

    // 폰이 끝에 갔을 경우
    if (move[0] === move[0].toLowerCase() && move.length === 5) {
      move = move.slice(1);
    }

    // // 앞글자가 N이고, 4글자인 경우 두 번째 글자를 제거
    if (move[0] === "N" && move.length === 4) {
      move = move[0] + move.slice(2);
    }

    // // 앞글자가 R이고, 4글자인 경우 두 번째 글자를 제거
    if (move[0] === "R" && move.length === 4) {
      move = move[0] + move.slice(2);
    }

    // // 앞글자가 B이고, 4글자인 경우 두 번째 글자를 제거
    if (move[0] === "B" && move.length === 4) {
      move = move[0] + move.slice(2);
    }

    return move;
  });
};

export const convertMoves = (legalMoves) => {
  return legalMoves.map((move) => {
    // "x"를 포함하는 경우 "x"를 제거합니다.
    move = move.replace("x", "");

    // "+" 또는 "#"을 포함하는 경우 처리
    if (move.includes("+") || move.includes("#")) {
      // "+"나 "#"을 제거한 후 반환
      return move.replace(/[+#]/g, "");
    } else {
      return move;
    }
  });
};

export const getPawnMoves = (x, y, board, color, enPassantTarget) => {
  let direction = color === "black" ? 1 : -1;
  let moves = [];

  // 폰이 앞으로 한 칸 이동
  if (board[x + direction] && !board[x + direction][y]) {
    moves.push([x + direction, y]);

    // 흰색 폰의 경우 시작점에서 두 칸 이동 가능
    if (color === "white" && x === 6 && !board[x - 2][y] && !board[x - 1][y]) {
      moves.push([x - 2, y]);
    }
    // 검은색 폰의 경우 시작점에서 두 칸 이동 가능
    else if (
      color === "black" &&
      x === 1 &&
      !board[x + 2][y] &&
      !board[x + 1][y]
    ) {
      moves.push([x + 2, y]);
    }
  }

  // 폰이 대각선으로 상대 말을 잡는 경우 또는 앙팡상을 하는 경우
  if (board[x + direction]) {
    // 왼쪽 대각선으로 이동 가능한 경우
    if (
      y > 0 &&
      board[x + direction][y - 1] &&
      board[x + direction][y - 1].color !== color
    ) {
      moves.push([x + direction, y - 1]);
    }
    // 오른쪽 대각선으로 이동 가능한 경우
    if (
      y < 7 &&
      board[x + direction][y + 1] &&
      board[x + direction][y + 1].color !== color
    ) {
      moves.push([x + direction, y + 1]);
    }
  }

  // 앙팡상을 하는 경우
  if (enPassantTarget) {
    let [targetX, targetY] = enPassantTarget;
    let behindPawnX = x; // 현재 폰의 행 좌표를 가져옴
    if (
      (targetX === x && targetY - 1 === y) ||
      (targetX === x && targetY + 1 === y)
    ) {
      // 검은색 폰의 경우
      if (color === "black") {
        behindPawnX += 1; // 현재 폰의 위쪽으로 이동하여 뒤에 있는 폰의 행 좌표를 가져옴
      }
      // 흰색 폰의 경우
      else if (color === "white") {
        behindPawnX -= 1; // 현재 폰의 아래쪽으로 이동하여 뒤에 있는 폰의 행 좌표를 가져옴
      }

      // 뒤에 있는 폰의 좌표를 moves 배열에 추가
      moves.push([behindPawnX, targetY]);
    }
    console.log(x, y, " : ", targetX, targetY, "결과 : ",[behindPawnX, targetY]);
  }
  return moves;
};

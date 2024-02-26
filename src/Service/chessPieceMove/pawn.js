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
    else if (color === "black" && x === 1 && !board[x + 2][y] && !board[x + 1][y]) {
      moves.push([x + 2, y]);
    }
  }

  // 폰이 대각선으로 상대 말을 잡는 경우
  if (board[x + direction] && y > 0 && board[x + direction][y - 1] && board[x + direction][y - 1].color !== color) {
    moves.push([x + direction, y - 1]);
  }
  if (board[x + direction] && y < 7 && board[x + direction][y + 1] && board[x + direction][y + 1].color !== color) {
    moves.push([x + direction, y + 1]);
  }

  // 앙팡상을 하는 경우
  if (
    enPassantTarget &&
    enPassantTarget[0] === x + direction &&
    (enPassantTarget[1] === y - 1 || enPassantTarget[1] === y + 1)
  ) {
    moves.push(enPassantTarget);
  }

  return moves;
};

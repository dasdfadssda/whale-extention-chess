export const getPawnMoves = (x, y, board, color) => {
    let direction = color === "black" ? 1 : -1;
    let moves = [];
  
    // 폰이 앞으로 한 칸 이동
    if (!board[x + direction][y]) {
      moves.push([x + direction, y]);
  
      // 흰색 폰의 경우 시작점에서 두 칸 이동 가능
      if (color === "white" && x === 6 && !board[x - 2][y]) {
        moves.push([x - 2, y]);
      }
      // 검은색 폰의 경우 시작점에서 두 칸 이동 가능
      else if (color === "black" && x === 1 && !board[x + 2][y]) {
        moves.push([x + 2, y]);
      }
    }
  
    // 폰이 대각선으로 상대 말을 잡는 경우
    if (y > 0 && board[x + direction][y - 1] && board[x + direction][y - 1].color !== color) {
      moves.push([x + direction, y - 1]);
    }
    if (y < 7 && board[x + direction][y + 1] && board[x + direction][y + 1].color !== color) {
      moves.push([x + direction, y + 1]);
    }
  
    return moves;
  };
  
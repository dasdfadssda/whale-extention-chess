// checkMate.js
import { getPossibleMoves } from "./ChessPieceController";

export const isCheckMate = (kingPosition, color, board) => {
  const opponentColor = color === "white" ? "black" : "white";

  // 모든 말들이 움직일 수 있는 곳을 확인
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] && board[i][j].color === color) {
        const possibleMoves = getPossibleMoves(
          board[i][j].type,
          board[i][j].color,
          [i, j],
          board
        );

        // 그 말이 움직일 수 있는 곳 중에 왕이 안전한 곳이 있는지 확인
        for (let [moveX, moveY] of possibleMoves) {
          let hypotheticalBoard = JSON.parse(JSON.stringify(board)); // 가상의 보드 생성
          hypotheticalBoard[moveX][moveY] = hypotheticalBoard[i][j]; // 가상의 보드에서 말을 움직임
          hypotheticalBoard[i][j] = null;

          let isKingSafe = true;

          // 상대편의 모든 말이 움직일 수 있는 곳을 찾아 왕이 안전한지 확인
          for (let a = 0; a < 8; a++) {
            for (let b = 0; b < 8; b++) {
              if (
                hypotheticalBoard[a][b] &&
                hypotheticalBoard[a][b].color === opponentColor
              ) {
                const opponentMoves = getPossibleMoves(
                  hypotheticalBoard[a][b].type,
                  hypotheticalBoard[a][b].color,
                  [a, b],
                  hypotheticalBoard
                );
                if (
                  opponentMoves.some(
                    ([x, y]) => x === kingPosition[0] && y === kingPosition[1]
                  )
                ) {
                  isKingSafe = false;
                  break;
                }
              }
            }
            if (!isKingSafe) break;
          }

          // 왕이 안전한 곳이 하나라도 있다면, 체크메이트가 아닌 상황으로 반환
          if (isKingSafe) return false;
        }
      }
    }
  }

  // 모든 말들이 움직일 수 있는 곳 중에 왕이 안전한 곳이 없다면, 체크메이트 상황으로 반환
  return true;
};

// checkMate.js
import { getPossibleMoves } from "./ChessPieceController";

export const isCheckMate = (kingPosition, color, board) => {
  const opponentColor = color === "white" ? "black" : "white";

  outer: for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] && board[i][j].color === color) {
        const possibleMoves = getPossibleMoves(
          board[i][j].type,
          board[i][j].color,
          [i, j],
          board
        );

        for (let [moveX, moveY] of possibleMoves) {
          let hypotheticalBoard = JSON.parse(JSON.stringify(board));
          hypotheticalBoard[moveX][moveY] = hypotheticalBoard[i][j];
          hypotheticalBoard[i][j] = null;

          let isKingSafe = true;

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

          if (isKingSafe) return false;
          else continue outer; // 왕이 안전하지 않다면 다음 위치로 이동
        }
      }
    }
  }
  return true; // 모든 위치에서 왕이 안전하지 않다면 체크메이트
};

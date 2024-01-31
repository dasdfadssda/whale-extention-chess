import { getPossibleMoves } from "./ChessPieceController";

// checkMate.js
export const isCheckMate = (kingPosition, color, board) => {
    const [kingX, kingY] = kingPosition;
    const opponentColor = color === 'white' ? 'black' : 'white';
  
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] && board[i][j].color === opponentColor) {
          const possibleMoves = getPossibleMoves(board[i][j].type, board[i][j].color, [i, j], board);
          if (possibleMoves.some(([x, y]) => x === kingX && y === kingY)) {
            return true;
          }
        }
      }
    }
  
    return false;
  };
  
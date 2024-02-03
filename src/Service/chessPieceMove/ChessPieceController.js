// gameController.js
import { getKingMoves } from './king.js';
import { getQueenMoves } from './queen.js';
import { getRookMoves } from './rook.js';
import { getBishopMoves } from './bishop.js';
import { getKnightMoves } from './knight.js';
import { getPawnMoves } from './pawn.js';

// type의 말의 가능한 움직임 위치 반환
export const getPossibleMoves = (type, color, position, board) => {
  switch (type) {
    case 'king':
      return getKingMoves(...position, board, color);
    case 'queen':
      return getQueenMoves(...position, board, color);
    case 'rook':
      return getRookMoves(...position, board, color);
    case 'bishop':
      return getBishopMoves(...position, board, color);
    case 'knight':
      return getKnightMoves(...position, board, color);
    case 'pawn':
      return getPawnMoves(...position, board, color);
    default:
      return [];
  }
};

// 특정 색깔의 모든 체스 말에 대해 가능한 모든 움직임을 반환
export function getPossibleMovesForColor(board, color) {
  let moves = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece && piece.color === color) {
        const pieceMoves = getPossibleMoves(piece.type, color, [i, j], board);
        moves = moves.concat(pieceMoves);
      }
    }
  }

  return moves;
}

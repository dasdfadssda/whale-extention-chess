// gameController.js

import { getKingMoves } from './king.js';
import { getQueenMoves } from './queen.js';
import { getRookMoves } from './rook.js';
import { getBishopMoves } from './bishop.js';
import { getKnightMoves } from './knight.js';
import { getPawnMoves } from './pawn.js';

// type의 말의 가능한 움직임 위치 반환
export const getPossibleMoves = (type, color, position, board, enPassantTarget, castlingRights) => {
  switch (type) {
    case 'king':
      return getKingMoves(...position, board, color, castlingRights);
    case 'queen':
      return getQueenMoves(...position, board, color);
    case 'rook':
      return getRookMoves(...position, board, color);
    case 'bishop':
      return getBishopMoves(...position, board, color);
    case 'knight':
      return getKnightMoves(...position, board, color);
    case 'pawn':
      return getPawnMoves(...position, board, color, enPassantTarget);
    default:
      return [];
  }
};

// 특정 색깔의 모든 체스 말에 대해 가능한 모든 움직임을 반환
export function getPossibleMovesForColor(board, color, enPassantTarget, castlingRights) {
  let moves = {};

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piece = board[i][j];
      if (piece && piece.color === color) {
        const pieceMoves = getPossibleMoves(piece.type, color, [i, j], board, enPassantTarget, castlingRights);

        for (const move of pieceMoves) {
          const moveKey = move.join(',');
          if (!moves[moveKey]) {
            moves[moveKey] = {
              position: move,
              piece: { type: piece.type, color: piece.color, position: [i, j] }
            };
          }
        }
      }
    }
  }

  const movesArray = Object.values(moves);

  console.log(color, '상대 공격 가능 자리', movesArray);

  return movesArray;
}

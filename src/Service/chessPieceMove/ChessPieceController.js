// gameController.js
import { getKingMoves } from './king.js';
import { getQueenMoves } from './queen.js';
import { getRookMoves } from './rook.js';
import { getBishopMoves } from './bishop.js';
import { getKnightMoves } from './knight.js';
import { getPawnMoves } from './pawn.js';

export const getPossibleMoves = (type, color, position, board) => {
  switch (type) {
    case '킹':
      return getKingMoves(...position, board, color);
    case '퀸':
      return getQueenMoves(...position, board, color);
    case '룩':
      return getRookMoves(...position, board, color);
    case '비숍':
      return getBishopMoves(...position, board, color);
    case '나이트':
      return getKnightMoves(...position, board, color);
    case '폰':
      return getPawnMoves(...position, board, color);
    default:
      return [];
  }
};

// gameController.js
import { getKingMoves } from './king.js';
import { getQueenMoves } from './queen.js';
import { getRookMoves } from './rook.js';
import { getBishopMoves } from './bishop.js';
import { getKnightMoves } from './knight.js';
import { getPawnMoves } from './pawn.js';

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

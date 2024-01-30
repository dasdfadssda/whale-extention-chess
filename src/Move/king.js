import { checkAvailableIdx, checkAvailable } from "./move";

const king = (r, c, board, color, player) => {
  // get all basic moves

  let availableMoves = [];
  const row = [1, 1, 1, 0, -1, -1, -1, 0];
  const col = [1, -1, 0, 1, 1, -1, 0, -1];

  for (let i = 0; i < row.length; i++) {
    let nr = r + row[i];
    let nc = c + col[i];
    const idxValidation = checkAvailableIdx(nr, nc, board, color);
    if (Array.isArray(idxValidation)) {
      availableMoves.push([nr, nc]);
    } else if (idxValidation) {
      availableMoves.push([nr, nc]);
    }
  }

  // castling

  // is king check now?
  let colorNum;
  color === "white" ? (colorNum = 1) : (colorNum = 0);
  const isCheckSafeNow = isSpaceSafeFromEnemy(board, [r, c], player, color);
  // return moves if king is check now
  if (!isCheckSafeNow) {
    return availableMoves;
  }

  // check king already moved or not
  const king = board[r][c];
  // if king already moved return availableMoves
  if (king[2] !== 0) {
    return availableMoves;
  }

  // get rook's index
  let rookCols = getRookIdx(board, color);

  // get idx between king and rook
  for (let rookCol of rookCols) {
    let IndexBtwKingAndRook = getIdxBtwKingAndRook(board, r, c, rookCol);
    if (isSpacesSafeFromEnemy(board, IndexBtwKingAndRook, player, colorNum)) {
      if (IndexBtwKingAndRook.length !== 0) {
        if (IndexBtwKingAndRook[0][1] > c) {
          availableMoves.push([r, c + 2]);
        } else {
          availableMoves.push([r, c - 2]);
        }
      }
    }
  }
  return availableMoves;
};

const isSpacesSafeFromEnemy = (board, idxs, player, color) => {
  for (let idx of idxs) {
    if (!isSpaceSafeFromEnemy(board, idx, player, color)) {
      return false;
    }
  }
  return true;
};

const isSpaceSafeFromEnemy = (board, idx, player, color) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const piece = board[row][col];
      // piece is not blank and color is different
      if (piece !== 0 && piece[1] !== color) {
        const availableMoves = checkAvailable(
          row,
          col,
          board,
          player,
          "notMain"
        );
        for (let move of availableMoves) {
          if (move[0] === idx[0] && move[1] === idx[1]) {
            return false;
          }
        }
      }
      return true;
    }
  }
};

const getIdxBtwKingAndRook = (board, row, kingCol, rookCol) => {
  const index = [];
  let big;
  let small;
  if (kingCol > rookCol) {
    big = kingCol;
    small = rookCol;
  } else {
    big = rookCol;
    small = kingCol;
  }
  for (let small2 = small + 1; small2 < big; small2++) {
    if (board[row][small2] !== 0) {
      return [];
    }
    index.push([row, small2]);
  }

  return index;
};

const getRookIdx = (board, color) => {
  // if king did not move yet, get rook which never moved
  const rookIdx = [];
  let colorNum;
  color === "white" ? (colorNum = 1) : (colorNum = 0);
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const piece = board[row][col];
      if (piece[1] === colorNum && piece[0] === 4 && piece[2] === 0) {
        rookIdx.push(col);
      }
    }
  }
  return rookIdx;
};

export default king;
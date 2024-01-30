import pawn from "./pawn";
import kight from "./kight";
import rook from "./rook";
import bishop from "./bishop";
import queen from "./queen";
import king from "./king";
import { checkPawnEvolution, isCheckSafe, isCheckMate } from "../rules/rules";
import { COLOR, PIECES } from "../assets/colorAndPieces";

export const makeMove = (
  r,
  c,
  curRow,
  curCol,
  board,
  player,
  mode,
  changeTitle
) => {
  // make a move when player decided to move
  let newBoard = JSON.parse(JSON.stringify(board));
  let colorNum = newBoard[curRow][curCol][1];
  let color = COLOR[colorNum];
  let enemyColor;
  let enemyColorNum;
  // get piece
  const piece = newBoard[curRow][curCol];

  colorNum === 1 ? (color = "white") : (color = "black");
  color === "white" ? (enemyColor = "black") : (enemyColor = "white");
  enemyColor === "black" ? (enemyColorNum = 0) : (enemyColorNum = 1);
  if (piece[0] === 6 && Math.abs(curCol - c) === 2) {
    let curRookCol;
    let targetRookCol;
    if (curCol > c) {
      curRookCol = 0;
      targetRookCol = c + 1;
    } else {
      curRookCol = 7;
      targetRookCol = c - 1;
    }
    newBoard = swapPosition(
      curRow,
      curRookCol,
      r,
      targetRookCol,
      newBoard,
      player
    );
  }
  newBoard = swapPosition(curRow, curCol, r, c, newBoard, player);

  // check piece's first move status and update it's status
  if (
    (piece[0] === 1 || piece[0] === 4 || piece[0] === 6) &&
    checkFirstMove(newBoard, r, c)
  ) {
    newBoard[r][c][2] = 1;
  }

  if (mode === "main") {
    const isCheckMated = isCheckMate(newBoard, enemyColorNum, player);
    const curCheck = isCheckSafe(newBoard, player, enemyColorNum);

    if (isCheckMated) {
      const title = "checkmate! " + color + " win!";
      changeTitle(title, "red", false);
      return newBoard;
    } else if (!curCheck) {
      const title = "check!";
      changeTitle(title, "red", true);

      return newBoard;
    }
  }
  return newBoard;
};

// change position on the board
const swapPosition = (
  startRow,
  startCol,
  targetRow,
  targetCol,
  board,
  player
) => {
  // deep copy
  let newBoard = JSON.parse(JSON.stringify(board));
  const start = newBoard[startRow][startCol];
  const target = newBoard[targetRow][targetCol];
  newBoard[targetRow][targetCol] = start;
  newBoard[startRow][startCol] = 0;
  let playerNum;
  player === "white" ? (playerNum = 1) : (playerNum = 0);
  const color = start[1];

  // check en passant move
  // check pawn moved diagonal to empty space
  if (start[0] === 1 && target === 0 && startCol !== targetCol) {
    // check player and color
    if (playerNum === color) {
      newBoard[targetRow + 1][targetCol] = 0;
    } else {
      newBoard[targetRow - 1][targetCol] = 0;
    }
  }

  // if pawn reach the end, it evolutes to queen
  newBoard = checkPawnEvolution(newBoard, start, targetRow, targetCol, player);

  return newBoard;
};

// check pawn's first move
export const checkFirstMove = (board, r, c) => {
  const checkFirstMove = board[r][c][2];
  if (checkFirstMove === 0) {
    return true;
  } else {
    return false;
  }
};

// check available spot to move
export const checkAvailable = (r, c, board, previousBoard, player, mode) => {
  const kindColor = board[r][c];
  if (kindColor === 0) {
    return [];
  }
  const color = COLOR[kindColor[1]];
  const kind = PIECES[kindColor[0]];
  let result;

  if (kind === "pawn") {
    result = pawn(r, c, board, previousBoard, color, player, mode);
  } else if (kind === "kight") {
    result = kight(r, c, board, color);
  } else if (kind === "rook") {
    result = rook(r, c, board, color);
  } else if (kind === "bishop") {
    result = bishop(r, c, board, color);
  } else if (kind === "queen") {
    result = queen(r, c, board, color);
  } else if (kind === "king") {
    result = king(r, c, board, color, player);
  }
  // check moves are safe from check
  let colorNum;
  let cantMove = true;

  color === "white" ? (colorNum = 1) : (colorNum = 0);
  if (mode === "main") {
    // list to collect only safe move from check
    let safeResult = [];
    if (result.length === 0) {
      cantMove = false;
    }

    // check current board is safe from check
    const currentCheck = isCheckSafe(board, player, colorNum);

    // simulate all available moves of piece
    for (let i = 0; i < result.length; i++) {
      const move = result[i];
      const color = board[r][c][1];
      const targetRow = move[0];
      const targetCol = move[1];
      // make newBoard with move
      const newBoard = makeMove(targetRow, targetCol, r, c, board, player);
      // check new board is safe from check
      const check = isCheckSafe(newBoard, player, color);

      // if new board is safe safe it's move in safeResult list and assign cantMove to false
      if (check) {
        safeResult.push(move);
        cantMove = false;
      }
    }
    // if current board is check and piece cannot move, player should choose another piece to block it
    if (currentCheck && cantMove) {
      //alert("Check if you move it!");
      return;
      // if current board is not check and piece cannot move
      // which mean player is trying to move the piece that is blocking the king from the check
      // Thus, player should move another piece
    } else if (!currentCheck && cantMove) {
      //alert("it is check. You should move another one");
      return;
      // if piece can move return only safeMove
    } else if (!cantMove) {
      return safeResult;
    }
  }
  return result;
};

// get available horizontal moves
export const getAvailableMoves = (
  r,
  c,
  board,
  color,
  availableMoves,
  checks
) => {
  for (const check of checks) {
    if (check === "cross") {
      availableMoves = getAvailableCrossMoves(
        r,
        c,
        board,
        color,
        availableMoves
      );
    } else if (check === "diagonal") {
      availableMoves = getAvailableDiagonalMoves(
        r,
        c,
        board,
        color,
        availableMoves
      );
    }
  }
  return availableMoves;
};

const getAvailableDiagonalMoves = (r, c, board, color, availableMoves) => {
  const checks = ["right up", "right down", "left up", "left down"];
  for (let check of checks) {
    availableMoves = getAvailableMovesHelper(
      r,
      c,
      board,
      color,
      availableMoves,
      check
    );
  }
  return availableMoves;
};

const getAvailableMovesHelper = (r, c, board, color, availableMoves, check) => {
  for (let i = 1; i < 8; i++) {
    let nr;
    let nc;
    if (check === "right") {
      nr = r;
      nc = c + i;
    } else if (check === "left") {
      nr = r;
      nc = c - i;
    } else if (check === "down") {
      nr = r - i;
      nc = c;
    } else if (check === "up") {
      nr = r + i;
      nc = c;
    } else if (check === "right up") {
      nr = r + i;
      nc = c + i;
    } else if (check === "right down") {
      nr = r - i;
      nc = c + i;
    } else if (check === "left up") {
      nr = r + i;
      nc = c - i;
    } else if (check === "left down") {
      nr = r - i;
      nc = c - i;
    }
    const checkIdx = checkAvailableIdx(nr, nc, board, color);

    if (Array.isArray(checkIdx)) {
      // can move but no more
      availableMoves.push([nr, nc]);

      break;
    } else if (!checkIdx) {
      // cannot move
      break;
    } else {
      // can move
      availableMoves.push([nr, nc]);
    }
  }
  return availableMoves;
};

const getAvailableCrossMoves = (r, c, board, color, availableMoves) => {
  const checks = ["right", "left", "up", "down"];
  for (let check of checks) {
    availableMoves = getAvailableMovesHelper(
      r,
      c,
      board,
      color,
      availableMoves,
      check
    );
  }

  return availableMoves;
};

//verify index is available
export const checkAvailableIdx = (r, c, board, color) => {
  if (!checkIdxInBoard(r, c)) {
    return false;
  }
  if (checkEmpty(r, c, board)) {
    return true;
  }
  const curColor = checkColor(r, c, board);

  if (curColor !== color) {
    return [true, false];
  } else {
    return false;
  }
};

//check index is in board
export const checkIdxInBoard = (r, c) => {
  if (r < 8 && r >= 0 && c < 8 && c >= 0) {
    return true;
  } else {
    return false;
  }
};

export const checkColor = (r, c, board) => {
  if (checkEmpty(r, c, board)) {
    return null;
  }
  const piece = board[r][c];
  return COLOR[piece[1]];
};

// check spot is empty
export const checkEmpty = (r, c, board) => {
  if (board[r][c] !== 0) {
    return false;
  } else {
    return true;
  }
};

export default checkAvailable;
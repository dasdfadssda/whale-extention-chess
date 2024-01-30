import {
  checkFirstMove,
  checkIdxInBoard,
  checkEmpty,
  checkColor
} from "./move";
// check pawn's available move
const pawn = (r, c, board, previousBoard, color, player, mode) => {
  const availableMoves = [];
  let colorNum;
  color === "white" ? (colorNum = 1) : (colorNum = 0);
  // check is pawn's move first move
  const isFirstMove = checkFirstMove(board, r, c);
  let count;

  if (isFirstMove) {
    count = 2;
  } else {
    count = 1;
  }

  // push available moves

  for (let i = 1; i <= count; i++) {
    // move of piece is depend on the color
    if (player === color) {
      var nr = r - i;
    } else {
      nr = r + i;
    }

    // check available moves

    if (checkIdxInBoard(nr, c) && checkEmpty(nr, c, board)) {
      availableMoves.push([nr, c]);
    }
    if (!checkIdxInBoard(nr, c) || !checkEmpty(nr, c, board)) {
      break;
    }
  }

  // check diagonal move
  if (player === color) {
    var newR = r - 1;
  } else {
    newR = r + 1;
  }

  var newC1 = c - 1;
  var newC2 = c + 1;
  const diagonal = [
    [newR, newC1],
    [newR, newC2]
  ];
  for (let i = 0; i < 2; i++) {
    const checkPoint = diagonal[i];
    const nr = checkPoint[0];
    const nc = checkPoint[1];
    if (checkIdxInBoard(nr, nc)) {
      // pawn can only move when board is filled with enemy piece
      if (!checkEmpty(nr, nc, board) && checkColor(nr, nc, board) !== color) {
        availableMoves.push([nr, nc]);
      }
    }
  }

  //check en passant
  if (mode === "main") {
    const besideCols = [c - 1, c + 1];
    for (let col of besideCols) {
      // check index is available
      if (checkIdxInBoard(r, col)) {
        const piece = board[r][col];
        // check it is enemy pawn
        if (piece[0] === 1 && piece[1] !== colorNum) {
          // check enemy pawn move two space as a first move
          let nr;
          if (color === player) {
            nr = r - 2;
          } else {
            nr = r + 2;
          }

          if (checkIdxInBoard(nr, col)) {
            if (
              previousBoard[nr][col][0] === board[r][col][0] &&
              previousBoard[nr][col][1] === board[r][col][1]
            ) {
              if (color === player) {
                availableMoves.push([r - 1, col]);
              } else {
                availableMoves.push([r + 1, col]);
              }
            }
          }
        }
      }
    }
  }

  return availableMoves;
};

export default pawn;
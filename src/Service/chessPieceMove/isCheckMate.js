import { getPossibleMoves } from "./ChessPieceController";

export const checkMateStatus = (whiteKingPosition, blackKingPosition, board) => {
  const isWhiteCheckMate = isCheckMate(whiteKingPosition, 'white', board);
  const isBlackCheckMate = isCheckMate(blackKingPosition, 'black', board);

  if (isWhiteCheckMate && isBlackCheckMate) {
    console.log("draw")
    return 'draw';
  } else if (isWhiteCheckMate) {
    console.log("black")
    return 'black';
  } else if (isBlackCheckMate) {
    console.log("white")
    return 'white';
  } else {
    console.log("none")
    return 'none';
  }
};

const isCheckMate = (kingPosition, color, board) => {
  const [kingX, kingY] = kingPosition;
  const opponentColor = color === 'white' ? 'black' : 'white';

  // 왕이 공격받는 상황인지 확인
  let isUnderAttack = false;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] && board[i][j].color === opponentColor) {
        const possibleMoves = getPossibleMoves(board[i][j].type, board[i][j].color, [i, j], board);
        if (possibleMoves.some(([x, y]) => x === kingX && y === kingY)) {
          isUnderAttack = true;
          break;
        }
      }
    }
    if (isUnderAttack) {
      break;
    }
  }

  // 왕이 공격받지 않는 상황이면 체크메이트 상황이 아님
  if (!isUnderAttack) {
    return false;
  }

  // 왕이 움직일 수 있는 모든 위치를 가져옴
  const kingMoves = getPossibleMoves('킹', color, [kingX, kingY], board);

  for (let [x, y] of kingMoves) {
    let isSafe = true;

    // 각 위치에서 상대편이 공격할 수 있는지 확인
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] && board[i][j].color === opponentColor) {
          const possibleMoves = getPossibleMoves(board[i][j].type, board[i][j].color, [i, j], board);
          if (possibleMoves.some(([moveX, moveY]) => moveX === x && moveY === y)) {
            isSafe = false;
            break;
          }
        }
      }

      if (!isSafe) {
        break;
      }
    }

    // 왕이 움직일 수 있는 안전한 위치가 있으면 체크메이트 상황이 아님
    if (isSafe) {
      return false;
    }
  }

  // 왕이 움직일 수 있는 안전한 위치가 없으면 체크메이트
  return true;
};

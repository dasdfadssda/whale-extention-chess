import {
  getPossibleMoves,
  getPossibleMovesForColor,
} from "./ChessPieceController";

export const checkMateStatus = (
  whiteKingPosition,
  blackKingPosition,
  board,
  turn
) => {
  const whiteMoves = getPossibleMovesForColor(board, "white");
  const blackMoves = getPossibleMovesForColor(board, "black");

  if (turn === "white") {
    const isBlackInCheck = whiteMoves.some(
      (move) =>
        move.position[0] === blackKingPosition[0] &&
        move.position[1] === blackKingPosition[1]
    );

    if (isBlackInCheck) {
      const canEscape = canKingEscape(
        "black",
        blackKingPosition,
        whiteMoves,
        board
      );

      if (!canEscape) {
        return { status: "checkmate", winner: "white" };
      }

      return { status: "check", winner: null };
    }
  } else {
    const isWhiteInCheck = blackMoves.some(
      (move) =>
        move.position[0] === whiteKingPosition[0] &&
        move.position[1] === whiteKingPosition[1]
    );

    if (isWhiteInCheck) {
      const canEscape = canKingEscape(
        "white",
        whiteKingPosition,
        blackMoves,
        board
      );

      if (!canEscape) {
        return { status: "checkmate", winner: "black" };
      }

      return { status: "check", winner: null };
    }
  }

  return { status: "none", winner: null };
};

// 왕이 체크 상황에서 벗어날 수 있는지 확인하는 함수
function canKingEscape(color, kingPosition, opponentMoves, board) {
  const kingMoves = getPossibleMoves("king", color, kingPosition, board);

  // 왕이 이동할 수 있는 위치 중에서 안전한 위치가 있는지 확인
  const canKingMove = kingMoves.some(
    ([x, y]) =>
      !opponentMoves.some(
        (move) => move.position[0] === x && move.position[1] === y
      )
  );

  if (canKingMove) {
    return true;
  }

  // 모든 피스의 가능한 움직임 중에서 왕을 보호할 수 있는 움직임이 있는지 확인
  const allMoves = getPossibleMovesForColor(board, color);
  const canBlockCheck = allMoves.some(
    (move) =>
      !opponentMoves.some(
        (opponentMove) =>
          opponentMove.position[0] === move.position[0] &&
          opponentMove.position[1] === move.position[1]
      )
  );

  return canBlockCheck;
}

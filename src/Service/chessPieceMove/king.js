export const getKingMoves = (x, y, board, color, castlingRights) => {
  let moves = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];

  // 캐슬링 가능한 경우 추가
  if (color === "white") {
    if (castlingRights.whiteKingSide) moves.push([7, 6]);
    if (castlingRights.whiteQueenSide) moves.push([7, 2]);
  } else {
    if (castlingRights.blackKingSide) moves.push([0, 6]);
    if (castlingRights.blackQueenSide) moves.push([0, 2]);
  }

  return moves.filter(([x, y]) => {
    return (
      x >= 0 &&
      x < 8 &&
      y >= 0 &&
      y < 8 &&
      (!board[x][y] || board[x][y].color !== color)
    );
  });
};
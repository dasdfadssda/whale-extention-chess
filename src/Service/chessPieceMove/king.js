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

  console.log(castlingRights.whiteKingSide);
  if(castlingRights.whiteKingSide){
    moves.push([x, y + 2]);
  }
  if(castlingRights.whiteQueenSide){
    moves.push([x, y - 2]);
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
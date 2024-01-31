export const getKnightMoves = (x, y, board, color) => {
    let moves = [
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y - 2],
      [x - 1, y + 2],
      [x + 1, y - 2],
      [x + 1, y + 2],
      [x + 2, y - 1],
      [x + 2, y + 1],
    ];
  
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
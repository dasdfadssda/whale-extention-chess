export const getPawnMoves = (x, y, board, color) => {
    let direction = color === "black" ? 1 : -1;
    let moves = [[x + direction, y]];
  
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
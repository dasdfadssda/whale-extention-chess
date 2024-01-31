export const getBishopMoves = (x, y, board, color) => {
    let moves = [];
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  
    for (let [dx, dy] of directions) {
      for (let i = 1; i < 8; i++) {
        let nx = x + dx * i;
        let ny = y + dy * i;
  
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8)
          break;
  
        if (board[nx][ny]) {
          if (board[nx][ny].color !== color)
            moves.push([nx, ny]);
          break;
        }
  
        moves.push([nx, ny]);
      }
    }
  
    return moves;
  };
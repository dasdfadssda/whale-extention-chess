export function boardToChessJs(board) {
  let fen = '';

  for (let i = board.length - 1; i >= 0; i--) {
      let emptyCount = 0;
      for (let j = 0; j < board[i].length; j++) {
          if (board[i][j]) {
              if (emptyCount > 0) {
                  fen += emptyCount;
                  emptyCount = 0;
              }
              const pieceCode = board[i][j].color === 'white' ? board[i][j].type.toUpperCase() : board[i][j].type.toLowerCase();
              fen += pieceCode;
          } else {
              emptyCount++;
          }
      }
      if (emptyCount > 0) {
          fen += emptyCount;
      }
      if (i > 0) {
          fen += '/';
      }
  }

  return fen;
}

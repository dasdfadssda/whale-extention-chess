export const boardToFen = (board, currentTurn) => {
  let fen = "";
  for (let i = 0; i < 8; i++) {
    let emptyCount = 0;
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        if (emptyCount !== 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        const pieceTypeMap = {
          king: "k",
          queen: "q",
          bishop: "b",
          knight: "n",
          rook: "r",
          pawn: "p",
        };
        const letter = pieceTypeMap[piece.type];
        fen += piece.color === "white" ? letter.toUpperCase() : letter;
      } else {
        emptyCount++;
      }
    }
    if (emptyCount !== 0) fen += emptyCount;
    if (i !== 7) fen += "/";
  }
  fen += ` ${currentTurn === "white" ? "w" : "b"} KQkq - 0 1`;
  return fen;
};

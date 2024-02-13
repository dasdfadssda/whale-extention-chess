export const boardToFen = (
  board,
  currentTurn,
  castlingRights,
  enPassantTarget,
  halfmoveClock,
  fullmoveNumber
) => {
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

  // 공백 추가
  fen += " ";

  fen += currentTurn === "white" ? "w" : "b";

  // 공백 추가
  fen += " ";

  fen += castlingRights.whiteKingSide ? "K" : "";
  fen += castlingRights.whiteQueenSide ? "Q" : "";
  fen += castlingRights.blackKingSide ? "k" : "";
  fen += castlingRights.blackQueenSide ? "q" : "";

  // 캐슬링이 없는 경우
  if (fen.slice(-1) === " ") {
    fen += "-";
  }

  // 공백 추가
  fen += " ";

  fen += enPassantTarget || "-";

  // 공백 추가
  fen += " ";

  fen += halfmoveClock;

  // 공백 추가
  fen += " ";

  fen += fullmoveNumber;

  return fen;
};

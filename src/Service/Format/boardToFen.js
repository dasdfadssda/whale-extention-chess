export const boardToFen = (
  board,
  currentTurn,
  halfmoveClock,
  fullmoveNumber
) => {
  const pieceToFenMap = {
    pawn: "p",
    knight: "n",
    bishop: "b",
    rook: "r",
    queen: "q",
    king: "k",
    null: "1",
  };

  const computer = currentTurn === "white" ? "w" : "b";

  let fenString = "";

  for (let row of board) {
    let fenRow = "";
    let emptySquareCount = 0;

    for (let square of row) {
      if (square !== null) {
        if (emptySquareCount > 0) {
          fenRow += emptySquareCount;
          emptySquareCount = 0;
        }
        const fenPiece = pieceToFenMap[square.type];
        fenRow += square.color === "black" ? fenPiece : fenPiece.toUpperCase();
      } else {
        emptySquareCount++;
        if (emptySquareCount === 8) {
          fenRow += "8";
          emptySquareCount = 0;
        }
      }
    }
    if (fenRow.length !== 8 && fenRow !== "8") {
      if (emptySquareCount !== 0) fenRow += emptySquareCount;
    }
    fenString += fenRow + "/";
  }

  fenString = fenString.slice(0, -1);

  const fen =
    fenString + " " + computer + " - - " + halfmoveClock + " " + fullmoveNumber;
  return fen;
};

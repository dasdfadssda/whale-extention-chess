import { checkIdxInBoard, checkEmpty, checkColor } from "./move";

const knight = (r, c, board, color) => {
  const availableMoves = [];
  const moves = [
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
    [-2, -1],
    [-1, -2],
    [1, -2]
  ];
  for (let move = 0; move < moves.length; move++) {
    const curMove = moves[move];
    const nr = r + curMove[0];
    const nc = c + curMove[1];
    if (checkIdxInBoard(nr, nc)) {
      if (!checkEmpty(nr, nc, board) && checkColor(nr, nc, board) === color) {
        continue;
      }
      availableMoves.push([nr, nc]);
    }
  }
  return availableMoves;
};

export default knight;
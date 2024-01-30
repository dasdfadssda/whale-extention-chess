import { getAvailableMoves } from "./move";

const queen = (r, c, board, color) => {
  let availableMoves = [];
  const checks = ["cross", "diagonal"];

  availableMoves = getAvailableMoves(
    r,
    c,
    board,
    color,
    availableMoves,
    checks
  );

  return availableMoves;
};

export default queen;
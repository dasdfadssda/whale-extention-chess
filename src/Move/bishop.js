import { getAvailableMoves } from "./move";

const bishop = (r, c, board, color) => {
  let availableMoves = [];
  const checks = ["diagonal"];

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

export default bishop;
import React, { useState } from "react";
import styled from "styled-components";

function ChessBoard() {
  const [board, setBoard] = useState([
    Array(8).fill({ type: "룩", color: "black" }),
    Array(8).fill({ type: "폰", color: "black" }),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill({ type: "폰", color: "white" }),
    Array(8).fill({ type: "룩", color: "white" }),
  ]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const [possibleMoves, setPossibleMoves] = useState([]);

  const handleButtonClick = (i, j) => {
    if (selectedPiece) {
      if (possibleMoves.some(([x, y]) => x === i && y === j)) {
        movePiece(selectedPiece, [i, j]);
        setSelectedPiece(null);
        setPossibleMoves([]);
      }
    } else if (board[i][j]) {
      const selectedPieceColor = board[i][j].color;
      const selectedPieceType = board[i][j].type;
      setSelectedPiece([i, j]);
      setPossibleMoves(
        getPossibleMoves(selectedPieceType, selectedPieceColor, [i, j])
      );
    }
  };

  const getPossibleMoves = (type, color, [x, y]) => {
    switch (type) {
      case "폰":
        return color === "black" ? [[x + 1, y]] : [[x - 1, y]];
      default:
        return [];
    }
  };

  const movePiece = (from, to) => {
    const newBoard = [...board];
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    // 체스말 이동
    newBoard[toX][toY] = newBoard[fromX][fromY];
    newBoard[fromX][fromY] = null;

    setBoard(newBoard);
  };

  return (
    <div>
      {board.map((row, i) => (
        <Row key={i}>
          {row.map((piece, j) => (
            <Button
              key={j}
              row={i}
              column={j}
              piece={piece}
              isPossibleMove={possibleMoves.some(
                ([x, y]) => x === i && y === j
              )}
              onClick={() => handleButtonClick(i, j)}
            >
              {piece ? piece.type : ""}
            </Button>
          ))}
          <br />
        </Row>
      ))}
    </div>
  );
}

export default ChessBoard;

const Button = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${(props) => {
    if (props.isPossibleMove) {
      return "yellow";
    }
    return props.row % 2 === props.column % 2 ? "skyblue" : "green";
  }};
  color: ${(props) =>
    props.piece && props.piece.color === "white" ? "white" : "black"};
`;

const Row = styled.div`
  display: flex;
`;

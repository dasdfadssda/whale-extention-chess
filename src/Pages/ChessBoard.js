import React, { useState } from "react";
import styled from "styled-components";
import { getPossibleMoves } from "../Service/chessPieceMove/ChessPieceController";

function ChessBoard() {
  const [board, setBoard] = useState([
    [
      { type: "룩", color: "black" },
      { type: "나이트", color: "black" },
      { type: "비숍", color: "black" },
      { type: "퀸", color: "black" },
      { type: "킹", color: "black" },
      { type: "비숍", color: "black" },
      { type: "나이트", color: "black" },
      { type: "룩", color: "black" },
    ],
    Array(8).fill({ type: "폰", color: "black" }),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill({ type: "폰", color: "white" }),
    [
      { type: "룩", color: "white" },
      { type: "나이트", color: "white" },
      { type: "비숍", color: "white" },
      { type: "퀸", color: "white" },
      { type: "킹", color: "white" },
      { type: "비숍", color: "white" },
      { type: "나이트", color: "white" },
      { type: "룩", color: "white" },
    ],
  ]);

  const [selectedPiece, setSelectedPiece] = useState(null);

  const [possibleMoves, setPossibleMoves] = useState([]);

  const handleButtonClick = (i, j) => {
    if (selectedPiece) {
      if (i === selectedPiece[0] && j === selectedPiece[1]) {
        // 같은 버튼을 다시 눌렀을 때 무표호
        return;
      } else if (possibleMoves.some(([x, y]) => x === i && y === j)) {
        movePiece(selectedPiece, [i, j]);
        setSelectedPiece(null);
        setPossibleMoves([]);
      } else if (board[i][j]) {
        // 다른 체스말을 선택했을 때, 그 체스말의 상태로 변경
        const selectedPieceColor = board[i][j].color;
        const selectedPieceType = board[i][j].type;
        setSelectedPiece([i, j]);
        setPossibleMoves(
          getPossibleMoves(selectedPieceType, selectedPieceColor, [i, j], board) // 이 부분을 수정
        );
      }
    } else if (board[i][j]) {
      const selectedPieceColor = board[i][j].color;
      const selectedPieceType = board[i][j].type;
      setSelectedPiece([i, j]);
      setPossibleMoves(
        getPossibleMoves(selectedPieceType, selectedPieceColor, [i, j], board) // 이 부분을 수정
      );
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
  font-size: 12px;
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

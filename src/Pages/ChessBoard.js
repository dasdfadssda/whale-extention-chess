import React, { useState } from "react";
import styled from "styled-components";
import { getPossibleMoves } from "../Service/chessPieceMove/ChessPieceController";
import { isCheckMate } from "../Service/chessPieceMove/isCheckMate";

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

  // 왕의 위치를 관리하는 상태
  const [whiteKingPosition, setWhiteKingPosition] = useState([7, 4]);
  const [blackKingPosition, setBlackKingPosition] = useState([0, 4]);
  // 사용자가 선택한 체스말
  const [selectedPiece, setSelectedPiece] = useState(null);
  // 선택된 체스말이 움직일 수 있는 위치
  const [possibleMoves, setPossibleMoves] = useState([]);

  // 체스말 버튼을 클릭했을 때의 이벤트 핸들러
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

  // 체스말을 움직이는 함수
  const movePiece = (from, to) => {
    const newBoard = [...board];
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    // 체스말 이동
    newBoard[toX][toY] = newBoard[fromX][fromY];
    newBoard[fromX][fromY] = null;

    // 폰이 끝에 도달하여 퀸으로 바뀌는 경우
    if (newBoard[toX][toY].type === "폰" && (toX === 0 || toX === 7)) {
      newBoard[toX][toY].type = "퀸";
    }

    // 왕의 위치 업데이트
    if (newBoard[toX][toY].type === "킹") {
      if (newBoard[toX][toY].color === "white") {
        setWhiteKingPosition([toX, toY]);
      } else {
        setBlackKingPosition([toX, toY]);
      }
    }

    setBoard(newBoard);

    // 체크메이트 상황 확인
    if (isCheckMate(whiteKingPosition, "white", board)) {
      alert("Black team wins!");
    } else if (isCheckMate(blackKingPosition, "black", board)) {
      alert("White team wins!");
    }
  };

  // 체스 보드판을 렌더링
  return (
    <div>
      {board.map((row, i) => (
        <Row key={i}>
          {row.map((piece, j) => {
            // 선택한 체스말이 움직일 수 있는 위치인지 확인
            const isPossibleMove = possibleMoves.some(
              ([x, y]) => x === i && y === j
            );

            return (
              <Button
                key={j}
                row={i}
                column={j}
                piece={piece}
                isPossibleMove={isPossibleMove}
                onClick={() => handleButtonClick(i, j)}
              >
                {piece ? piece.type : ""}
              </Button>
            );
          })}
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

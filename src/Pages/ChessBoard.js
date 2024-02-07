import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getPossibleMoves } from "../Service/chessPieceMove/ChessPieceController";
import { checkMateStatus } from "../Service/chessPieceMove/isCheckMate";
import { handlePawnPromotion } from "../Service/chessPieceMove/pawnPromotion";
import PIECES_IMAGE from "../Static/Constants/ChessImg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import Timer from "../Components/Timer";
import useBestMove from "../Api/API";

function ChessBoard() {
  // 체스 초기 상태 state
  const [board, setBoard] = useState([
    [
      { type: "rook", color: "black" },
      { type: "knight", color: "black" },
      { type: "bishop", color: "black" },
      { type: "king", color: "black" },
      { type: "queen", color: "black" },
      { type: "bishop", color: "black" },
      { type: "knight", color: "black" },
      { type: "rook", color: "black" },
    ],
    Array(8).fill({ type: "pawn", color: "black" }),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill({ type: "pawn", color: "white" }),
    [
      { type: "rook", color: "white" },
      { type: "knight", color: "white" },
      { type: "bishop", color: "white" },
      { type: "king", color: "white" },
      { type: "queen", color: "white" },
      { type: "bishop", color: "white" },
      { type: "knight", color: "white" },
      { type: "rook", color: "white" },
    ],
  ]);

  // 왕의 위치를 관리하는 상태
  const [whiteKingPosition, setWhiteKingPosition] = useState([7, 4]);
  const [blackKingPosition, setBlackKingPosition] = useState([0, 4]);
  // 사용자가 선택한 체스말
  const [selectedPiece, setSelectedPiece] = useState(null);
  // 선택된 체스말이 움직일 수 있는 위치
  const [possibleMoves, setPossibleMoves] = useState([]);
  // 현재 차례인 팀을 나타내는 상태
  const [currentTurn, setCurrentTurn] = useState("white");
  // useNavigate 선언
  const navigate = useNavigate();
  // 클릭된 버튼 변수 관리
  const [selectedButton, setSelectedButton] = useState(null);
  // AI 변수 선언
  const bestMoveResponse = useBestMove(board, currentTurn);

  // AI 연결
  useEffect(() => {
    if (currentTurn === "black" && bestMoveResponse && bestMoveResponse.data) {
      const bestMove = bestMoveResponse.data;
  
      // return 값 커스텀
      const moveInfo = bestMove.split(" ")[1];
      const from = [8 - parseInt(moveInfo[1]), moveInfo.charCodeAt(0) - 97];
      const to = [8 - parseInt(moveInfo[3]), moveInfo.charCodeAt(2) - 97];
  
      // return 값에 따라 이동 실행
      movePiece(from, to);
      console.log("뤼턴값 :", bestMove);
    } 
  }, [currentTurn, bestMoveResponse]);
  

  // 체스말 버튼을 클릭했을 때의 이벤트 핸들러
  const handleButtonClick = (i, j) => {
    // 현재 턴과 선택한 말 색 구분
    if (board[i][j] && board[i][j].color !== currentTurn) {
      if (possibleMoves.some(([x, y]) => x === i && y === j)) {
        // 적의 말이 있는 위치를 클릭하면 말을 잡습니다.
        movePiece(selectedPiece, [i, j]);
        setSelectedPiece(null);
        setPossibleMoves([]);
      }
      return;
    }
    // 선택된 좌표 선언
    setSelectedButton([i, j]);

    if (selectedPiece) {
      if (i === selectedPiece[0] && j === selectedPiece[1]) {
        setSelectedPiece(null);
        setPossibleMoves([]);
      } else if (possibleMoves.some(([x, y]) => x === i && y === j)) {
        movePiece(selectedPiece, [i, j]);
        setSelectedPiece(null);
        setPossibleMoves([]);
      } else if (board[i][j] && board[i][j].color === currentTurn) {
        const selectedPieceColor = board[i][j].color;
        const selectedPieceType = board[i][j].type;
        setSelectedPiece([i, j]);
        setPossibleMoves(
          getPossibleMoves(selectedPieceType, selectedPieceColor, [i, j], board)
        );
      }
    } else if (board[i][j] && board[i][j].color === currentTurn) {
      const selectedPieceColor = board[i][j].color;
      const selectedPieceType = board[i][j].type;
      setSelectedPiece([i, j]);
      setPossibleMoves(
        getPossibleMoves(selectedPieceType, selectedPieceColor, [i, j], board)
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

    // 폰이 끝에 도달한 경우
    if (newBoard[toX][toY].type === "pawn" && (toX === 0 || toX === 7)) {
      handlePawnPromotion(newBoard, toX, toY);
    }

    // 왕의 위치 업데이트
    if (newBoard[toX][toY].type === "king") {
      if (newBoard[toX][toY].color === "white") {
        setWhiteKingPosition([toX, toY]);
      } else {
        setBlackKingPosition([toX, toY]);
      }
    }

    setBoard(newBoard);
    // 순서 교체
    setCurrentTurn(currentTurn === "white" ? "black" : "white");

    // 체크메이트 상황 확인
    const result = checkMateStatus(
      whiteKingPosition,
      blackKingPosition,
      board,
      currentTurn
    );

    if (result.status === "checkmate") {
      alert(`${result.winner} has won the game!`);

      const userResponse = prompt(
        "Enter 0 to restart the game or 1 to return to the homepage."
      );

      if (userResponse === "0") {
        // 게임을 다시 시작하는 로직 추가 예정
      } else if (userResponse === "1") {
        // 루트 페이지로 이동
        navigate(ROUTES.HOME);
      }
    }
    console.log(result);

    // 선택된 좌표 해제
    setSelectedButton(null);
  };

  // 체스 보드판을 렌더링
  return (
    <>
      <Div>
        {board.map((row, i) => (
          <Row key={i}>
            {row.map((piece, j) => (
              <Button
                key={j}
                row={i}
                column={j}
                piece={piece}
                isSelected={
                  selectedButton &&
                  selectedButton[0] === i &&
                  selectedButton[1] === j
                }
                isPossibleMove={possibleMoves.some(
                  ([x, y]) => x === i && y === j
                )}
                onClick={() => handleButtonClick(i, j)}
              >
                {piece ? (
                  <img
                    src={require(`../Static${
                      PIECES_IMAGE[piece.type.toLowerCase()][piece.color]
                    }`)}
                    alt={piece.type}
                  />
                ) : (
                  ""
                )}
              </Button>
            ))}
            <br />
          </Row>
        ))}
        <Timer />
      </Div>
    </>
  );
}

export default ChessBoard;

const Button = styled.button`
  width: 12vw;
  height: 11.5vw;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  background-color: ${(props) => {
    if (props.isSelected) {
      return "yellow";
    }
    if (props.isPossibleMove) {
      return "yellow";
    }
    return props.row % 2 === props.column % 2 ? "#E38C56" : "#D66602";
  }};
  color: ${(props) =>
    props.piece && props.piece.color === "white" ? "white" : "black"};

  &:active {
    filter: brightness(70%);
  }

  img {
    max-width: 80%;
    max-height: 80%;
  }
`;

const Row = styled.div`
  display: flex;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: vh;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  margin-top: 7vw;
`;

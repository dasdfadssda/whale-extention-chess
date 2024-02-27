import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { getPossibleMoves } from "../Service/chessPieceMove/ChessPieceController";
import { handlePawnPromotion } from "../Service/chessPieceMove/pawnPromotion";
import PIECES_IMAGE from "../Static/Constants/ChessImg";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import Timer from "../Components/Timer";
import useBestMove from "../Api/ChessMoveApi";
import { boardToFen } from "../Service/Format/boardToFen";
import { TimerContext } from "../Context/TimerContext";
import ConfirmationDialog from "../Components/Dialog";
import DeadPieces from "../Components/DeadPieces";
import { Chess } from "chess.js";
import { DifficultyContext } from "../Context/DifficultyContext";
import { UserContext } from "../Context/UserContext";
import { saveScoreToFirestore } from "../Service/Score/SetOneScore";
import { initialBoardState } from "../Model/InitialBoardStateModal";
import { updateGameCountNum } from "../Service/GameCount/SetGameCount";
import { generateMoveString } from "../Service/Format/generatingMoveString";
import { convertMoves } from "../Service/Format/convertMovesCode";
import { updatedGameNum } from "../Service/Score/UpdateGameNum";

function ChessBoard() {
  //랭킹 시간
  const rankingTime = localStorage.getItem("rankingTime");
  // 체스 초기 상태 state
  const [board, setBoard] = useState(initialBoardState);
  // 사용자가 선택한 체스말 state
  const [selectedPiece, setSelectedPiece] = useState(null);
  // 선택된 체스말이 움직일 수 있는 위치 state
  const [possibleMoves, setPossibleMoves] = useState([]);
  // 현재 차례인 팀을 나타내는 state
  const [currentTurn, setCurrentTurn] = useState("white");
  // 흰말이 움직인 위치
  const [movedPiece, setMovedPiece] = useState("");
  // 각 팀이 움직일 수 있는 위치
  const [whiteCanMove, setWhiteCanMove] = useState([]);
  const [blackCanMove, setBlackCanMove] = useState([]);
  // 클릭한 버튼 state
  const [selectedButton, setSelectedButton] = useState(null);
  // 클릭된 버튼 state
  const [beforeMove, setBeforeMove] = useState(null);
  // 게임 진행사항 세팅
  const [isOngoing, setIsOngoing] = useState(0);
  // 앙 팡상 타겟 상태
  const [enPassantTarget, setEnPassantTarget] = useState([]);
  // 앙 팡상에 따른 가능해진 움직임
  const [enPassanPlace, setEnPassanPlace] = useState(null);
  // 죽은말 state
  const [deadPieces, setDeadPieces] = useState({ white: [], black: [] });
  // 캐슬링 권한 상태
  const [castlingRights, setCastlingRights] = useState({
    whiteKingSide: true,
    whiteQueenSide: true,
    blackKingSide: true,
    blackQueenSide: true,
  });
  // 이동 가능한 반 수
  const [halfmoveClock, setHalfmoveClock] = useState(0);
  // 게임이 시작된 후의 반 수
  const [fullmoveNumber, setFullmoveNumber] = useState(1);
  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  // dialog Message
  const [result, setResult] = useState("you win!");
  const [outMessage, setOutMessage] = useState("play again");
  // diaglogButton 핸들러
  const handleDialogButtonClick = () => {
    setBoard(initialBoardState);
    setFullmoveNumber(1);
    setHalfmoveClock(0);
    setCastlingRights({
      whiteKingSide: true,
      whiteQueenSide: true,
      blackKingSide: true,
      blackQueenSide: true,
    });
    setCurrentTurn("white");
    setEnPassantTarget(null);
    setBeforeMove(null);
    setDeadPieces({ white: [], black: [] });

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  // Home useNavigate 선언
  const [homeRoute, setHomeRoute] = useState(ROUTES.HOME);
  // useNavigate 선언
  const navigate = useNavigate();
  // Context api 선언 - Timer 변수
  const { timeState } = useContext(TimerContext);
  // ContextAPI - 난이도 변수
  const { difficulty } = useContext(DifficultyContext);
  const { user } = useContext(UserContext);
  // AI 변수 선언
  const bestMoveResponse = useBestMove(
    board,
    currentTurn,
    halfmoveClock,
    fullmoveNumber
  );

  // AI 검정말 포맷
  useEffect(() => {
    if (isOngoing < 1) {
      setTimeout(() => {
        if (
          currentTurn === "black" &&
          bestMoveResponse &&
          bestMoveResponse.data
        ) {
          const bestMove = bestMoveResponse.data;
          console.log("ai가 움직이라는 곳 : ", bestMove);
          // 정규 표현식을 사용하여 "bestmove" 다음에 오는 좌표를 추출합니다.
          const match = bestMove.match(/bestmove\s+(\w+)/);
          if (match) {
            const moveInfo = match[1];
            const from = [
              8 - parseInt(moveInfo[1]),
              moveInfo.charCodeAt(0) - 97,
            ];
            const to = [8 - parseInt(moveInfo[3]), moveInfo.charCodeAt(2) - 97];

            movePiece(from, to);
          }
        }
      }, 500);
    } else {
      console.error("Game over");
    }
  }, [currentTurn, bestMoveResponse]);

  // Chess.js 선언
  const chess = new Chess();

  // 체크메이트 검사
  useEffect(() => {
    const loadChessFromBoard = async () => {
      const chessBoard = boardToFen(
        board,
        currentTurn,
        halfmoveClock,
        fullmoveNumber
      );

      // 변환된 보드 상태를 Chess.js로 로드
      chess.load(chessBoard);
      // 체크메이트 상황인지 확인
      const isCheckmate = chess.isCheckmate();
      // 현재 플레이어의 모든 합법적인 수
      const legalMoves = chess.moves();

      // 캐슬링 부여
      if (castlingRights.whiteKingSide === true) {
        legalMoves.push("Kg1");
      }
      if (castlingRights.whiteQueenSide === true) {
        legalMoves.push("Kc1");
      }
      // 앙팡상 로직
      if (enPassantTarget != null) {
        const x = enPassantTarget[0] - 1;
        const y = enPassantTarget[1];
        console.log("xx, yy : ", x, y);
        legalMoves.push(generateMoveString([x, y], "pawn"));
        console.error(
          "generateMoveString(enPassantTarget, :",
          generateMoveString([x, y], "pawn")
        );
        setEnPassanPlace(generateMoveString([x, y], "pawn"));
      } else {
        setEnPassanPlace(null);
      }
      // 앙팡상 움직임 부여
      if (enPassanPlace != null) {
        legalMoves.push(enPassanPlace);
        console.error("enPassanPlace :", enPassanPlace);
      }

      for (let i = 0; i < 8; i++) {
        const move = String.fromCharCode(97 + i) + "4";
        if (!legalMoves.includes(move)) {
          legalMoves.push(move);
        }
      }

      // 승자 선언
      let winner = currentTurn;

      // TODO : isLegal를 통해 체크 메이트 로직
      let isLegal = true; // 변수 선언 및 초기화

      if (isOngoing > 0) {
        if (currentTurn === "black") {
          // 검정말 위치 선언
          const convertedMoves = convertMoves(legalMoves);
          setBlackCanMove(convertedMoves);
          // console.log(
          //   "흰색의 가능했던 움직임 :",
          //   whiteCanMove,
          //   "movedPiece : ",
          //   movedPiece
          // );
          isLegal =
            whiteCanMove.includes(movedPiece) || whiteCanMove.length === 0;
          // console.error("흰색의 자살 :", !isLegal);
          if (!isLegal) {
            winner = "black";
          }
        } else {
          // 흰 위치 선언
          const convertedMoves = convertMoves(legalMoves);
          setWhiteCanMove(convertedMoves);
          isLegal =
            blackCanMove.includes(movedPiece) || blackCanMove.length === 0;
          console.error("검정색의 자살 :", !isLegal);
          if (!isLegal) {
            winner = "white";
          }
        }
        if (!isLegal) {
          console.log("승자는 ? :", currentTurn);
        }
      }

      console.log("체크메이트 계산 :", isCheckmate);
      if (isCheckmate || !isLegal) {
        // 게임 종료 선언
        setIsOngoing(2);
        // 승자 선언
        if (isCheckmate) {
          winner = currentTurn === "white" ? "black" : "white";
        }
        // 게임 종료시 시간 저장
        const currentTime = timeState;
        // dialog를 위한 result와 outMessage 설정
        if (winner === "black") {
          setResult("You lose");
          setOutMessage("Try again");
        } else {
          setResult("You win");
          setOutMessage("Play again");
          // Firebase-Score에 이겼을 경우
          if (localStorage.getItem("id") != null) {
            if (
              currentTime < rankingTime &&
              (user.gameInfo[difficulty].time > currentTime ||
                user.gameInfo[difficulty].time === 0)
            ) {
              setHomeRoute(ROUTES.RANKING);
            }
           if(currentTime != 0){
            if (
              user.gameInfo[difficulty].time > currentTime ||
              user.gameInfo[difficulty].time === 0
            ) {
              saveScoreToFirestore(difficulty, user, currentTime);
            } else {
              updatedGameNum(difficulty, user, currentTime);
              console.log("잘했으나 최고 기록은 아님");
            }
           }
          }
        }
        // 다이얼로그 출현
        setDialogOpen(true);
        // 게임 수 추가
        updateGameCountNum();
      }
    };

    loadChessFromBoard();
  }, [board]);

  // 체스말 버튼을 클릭했을 때의 이벤트 핸들러
  const handleButtonClick = (i, j) => {
    // 현재 턴이 흰색이 아니라면 함수 종료
    // if (currentTurn !== "white") return;

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
    console.error("앙팡상 : ", enPassantTarget);

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
      } else {
        // getPossibleMoves()에서 반환된 좌표 외의 다른 좌표를 누르면
        // 이동 가능한 위치를 초기화합니다.
        setPossibleMoves([]);
        if (board[i][j] && board[i][j].color === currentTurn) {
          const selectedPieceColor = board[i][j].color;
          const selectedPieceType = board[i][j].type;
          setSelectedPiece([i, j]);
          setPossibleMoves(
            getPossibleMoves(
              selectedPieceType,
              selectedPieceColor,
              [i, j],
              board,
              enPassantTarget,
              castlingRights
            )
          );
        }
      }
    } else if (board[i][j] && board[i][j].color === currentTurn) {
      const selectedPieceColor = board[i][j].color;
      const selectedPieceType = board[i][j].type;
      setSelectedPiece([i, j]);
      setPossibleMoves(
        getPossibleMoves(
          selectedPieceType,
          selectedPieceColor,
          [i, j],
          board,
          enPassantTarget,
          castlingRights
        )
      );
    }
  };

  // 체스말을 움직이는 함수
  const movePiece = (from, to) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    const [fromX, fromY] = from;
    const [toX, toY] = to;

    // 움직인 위치 선언
    const movedPiece = newBoard[fromX][fromY]
      ? generateMoveString(to, newBoard[fromX][fromY].type)
      : null;
    if (movedPiece) {
      setMovedPiece(movedPiece);
      console.log(currentTurn, "말의 움직인 위치 :", movedPiece);
      console.log(currentTurn, "움직인 타입 :", newBoard[fromX][fromY].type);
      console.log(currentTurn, "움직인 색 :", newBoard[fromX][fromY].color);
    } else {
      console.error(`No piece at position: ${from}`);
    }
    console.log("움직인 : ", movedPiece);

    // 현재 색과 다른 말을 움직이려고 시도한 경우 처리
    if (movedPiece && newBoard[fromX][fromY].color !== currentTurn) {
      console.error(`Cannot move opponent's piece.`);
      return;
    }

    // 이전 위치 선언
    setBeforeMove(from);

    // `from` 위치에 체스말이 있는지 확인
    if (!newBoard[fromX][fromY]) {
      console.error(`No piece at position: ${from}`);
      return;
    }

    // 이동 가능한 반 수 증가
    setHalfmoveClock((prev) => prev + 1);
    // 흑색 턴이 완료될 때마다 게임이 시작된 후의 반 수 증가
    if (currentTurn === "black") {
      setFullmoveNumber((prev) => prev + 1);
    }

    // 죽은 말 관리
    if (newBoard[toX][toY]) {
      const deadPiece = newBoard[toX][toY];
      const opponentColor = deadPiece.color === "white" ? "black" : "white";

      setDeadPieces((prev) => ({
        ...prev,
        [opponentColor]: [...prev[opponentColor], deadPiece],
      }));
    }

    // 앙파상의 결과 적용
    if (movedPiece === enPassanPlace && currentTurn === "white") {
      const deadPiece = newBoard[toX + 1][toY];
      const opponentColor = deadPiece.color === "white" ? "black" : "white";

      setDeadPieces((prev) => ({
        ...prev,
        [opponentColor]: [...prev[opponentColor], deadPiece],
      }));
      newBoard[toX + 1][toY] = null;
    }

    // 체스말 이동
    newBoard[toX][toY] = newBoard[fromX][fromY];
    newBoard[fromX][fromY] = null;

    // 폰이 끝에 도달한 경우
    if (newBoard[toX][toY].type === "pawn" && (toX === 0 || toX === 7)) {
      handlePawnPromotion(newBoard, toX, toY);
    }

    // 체스판 업데이트
    setBoard(newBoard);

    if (
      currentTurn === "white" &&
      (newBoard[toX][toY].type === "king" || newBoard[toX][toY].type === "rook")
    ) {
      setCastlingRights({
        whiteKingSide: false,
        whiteQueenSide: false,
        blackKingSide: false,
        blackQueenSide: false,
      });
      const isWhiteKing = newBoard[toX][toY].color === "white";
      // 킹 사이드 캐슬링
      if (
        (isWhiteKing && fromX === 7 && fromY === 4 && toX === 7 && toY === 6) || // 흰색 킹 사이드
        (!isWhiteKing && fromX === 0 && fromY === 4 && toX === 0 && toY === 6) // 검은색 킹 사이드
      ) {
        // 킹이 이동했으므로 룩도 이동시킵니다.
        newBoard[toX][toY - 1] = newBoard[toX][7]; // 킹 사이드 룩을 킹 옆으로 이동
        newBoard[toX][7] = null; // 원래 룩의 위치를 비움
      }
      // 퀸 사이드 캐슬링
      else if (
        (isWhiteKing && fromX === 7 && fromY === 4 && toX === 7 && toY === 2) || // 흰색 퀸 사이드
        (!isWhiteKing && fromX === 0 && fromY === 4 && toX === 0 && toY === 2) // 검은색 퀸 사이드
      ) {
        // 킹이 이동했으므로 룩도 이동시킵니다.
        newBoard[toX][toY + 1] = newBoard[toX][0]; // 퀸 사이드 룩을 킹 옆으로 이동
        newBoard[toX][0] = null; // 원래 룩의 위치를 비움
      }
    }
    // 앙팡상 타겟 업데이트
    if (newBoard[toX][toY]) {
      if (
        newBoard[toX][toY].type === "pawn" &&
        Math.abs(fromX - toX) === 2 // 앞으로 두 칸 이동한 경우만 확인
      ) {
        // 앙 팡상 타겟 설정
        const enPassantX = toX; // 폰이 앞으로 움직이므로 X 좌표는 그대로 유지
        const enPassantY = toY; // 폰이 앞으로 움직이므로 Y 좌표는 목적지로 변경
        if (enPassantY && enPassantX) {
          setEnPassantTarget([enPassantX, enPassantY]); // 앙팡상 타겟 설정
        }
      } else {
        // 그 외의 경우 앙팡상 타겟 해제
        setEnPassantTarget(null);
      }
    }

    // 게임 시작 선언
    setIsOngoing(1);
    // 선택된 좌표 해제
    setSelectedButton(null);
    // 순서 교체
    setCurrentTurn(currentTurn === "white" ? "black" : "white");
  };

  // 체스 보드판을 렌더링
  return (
    <>
      <Div>
        <Timer onButtonClick={handleDialogButtonClick} />
        {board.map((row, i) => (
          <Row key={i}>
            {row.map((piece, j) => (
              <Button
                key={j}
                row={i}
                column={j}
                piecetype={piece}
                isSelected={
                  selectedButton &&
                  selectedButton[0] === i &&
                  selectedButton[1] === j
                }
                BeforeMove={
                  beforeMove && beforeMove[0] === i && beforeMove[1] === j
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
        <DeadPieces color="black" pieces={deadPieces.white} />
        <ConfirmationDialog
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onButtonClick={handleDialogButtonClick}
          noNavigate={() => navigate(homeRoute)}
          yesNavigate={() => navigate(ROUTES.CHESS)}
          message={result}
          yesText={outMessage}
          noText="HOME"
        />
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
  cursor: pointer;
  background-color: ${(props) => {
    if (props.piecetype) {
      if (props.isSelected) {
        return "#F3BE00";
      }
    }
    if (props.isPossibleMove) {
      return "#F3BE00";
    }
    if (props.BeforeMove) {
      return "#FF4D00";
    }
    return props.row % 2 === props.column % 2 ? "#E38C56" : "#D66602";
  }};
  color: ${(props) =>
    props.piece && props.piece.color === "white" ? "white" : "black"};

  &:active {
    filter: brightness(70%);
  }

  img {
    max-width: 85%;
    max-height: 85%;
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
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  margin-top: 7vw;
`;

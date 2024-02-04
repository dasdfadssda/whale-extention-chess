// api 관리 디렉토리
import React from 'react';

function boardToFen(board) {
    // 체스말을 FEN 문자열로 변환하는 맵
    const pieceToFenMap = {
      "pawn": "p",
      "knight": "n",
      "bishop": "b",
      "rook": "r",
      "queen": "q",
      "king": "k",
      null: "1" // 빈 칸은 숫자로 표시
    };
  
    let fenString = '';
  
    for (let row of board) {
      let fenRow = '';
      let emptySquareCount = 0;
  
      for (let square of row) {
        if (square !== null) {
          // 체스말이 있는 경우 해당 체스말을 FEN 문자열에 추가
          if (emptySquareCount > 0) {
            fenRow += emptySquareCount;
            emptySquareCount = 0;
          }
          const fenPiece = pieceToFenMap[square.type];
          fenRow += square.color === "black" ? fenPiece : fenPiece.toUpperCase();
        } else {

          emptySquareCount++;
          if (emptySquareCount === 8) {
            fenRow += '8';
            emptySquareCount = 0;
          }
        }
      }
      if(fenRow.length !== 8 && fenRow !=="8"){
        fenRow+=emptySquareCount;
      }
  
      // 각 행을 구분하기 위해 슬래시 추가
      fenString += fenRow + '/';
    }
  
    // 마지막 슬래시 제거
    fenString = fenString.slice(0, -1);
  
    return fenString;
  }

  function fen(board, computer ,level){

    const fen = "fen=" + boardToFen(board) + " "+ computer +" - - "+ level;

    return fen;
  }
  
//연습용
  const board = [
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
    [
      { type: "pawn", color: "white" },null, null, null, 
      null, null, { type: "pawn", color: "black" }, null
    ],
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
  ];
  
  // 예시 board를 FEN 문자열로 변환
  const fenString = fen(board, "b" ,5);
  console.log(fenString); 
  

  
  

// App 컴포넌트
function API() {
  // 초기 FEN 문자열과 수행할 수
  // 결과 FEN 문자열을 출력
  return (
    <div className="App">
      <p style={{color:"white"}}>Result FEN String: {fenString}</p>
    </div>
  );
}

export default API;

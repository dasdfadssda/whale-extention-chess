import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'; // useContext 제거
import { DifficultyContext } from '../Context/DifficultyContext'; 

function boardToFen(board) {
    const pieceToFenMap = {
      "pawn": "p",
      "knight": "n",
      "bishop": "b",
      "rook": "r",
      "queen": "q",
      "king": "k",
      null: "1"
    };
  
    let fenString = '';
  
    for (let row of board) {
      let fenRow = '';
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
            fenRow += '8';
            emptySquareCount = 0;
          }
        }
      }
      if (fenRow.length !== 8 && fenRow !== "8") {
        fenRow += emptySquareCount;
      }
      fenString += fenRow + '/';
    }
  
    fenString = fenString.slice(0, -1);
  
    return fenString;
}

function fenAPI(board, computer, turn) {
    const fen = boardToFen(board) + " " + computer + " - - 5 " + turn;
    return fen; // 수정: 문자열을 반환하도록 수정
}

function bestMove({ board }) {
  const [bestMove, setBestMove] = useState();
  console.log(bestMove);
  console.log(board);

  useEffect(() => {
      const apiUrl = 'https://stockfish.online/api/stockfish.php';
      const fen = fenAPI(board, "b", 1);
      console.log(fen);
      let depth = 5;
      // if (difficulty === "Hard") depth = 14;
      // if (difficulty === "Normal") depth = 9;
      console.log(depth);

      // 비동기 작업을 수행하는 함수를 정의합니다.
      const fetchBestMove = async () => {
          try {
              const response = await axios.get(apiUrl, {
                  params: {
                      fen: fen,
                      depth: depth,
                      mode: 'bestmove'
                  }
              });
              setBestMove(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      // 비동기 작업을 수행합니다.
      fetchBestMove();
  }, [board]); 

  return bestMove;
}

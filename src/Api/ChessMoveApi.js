import axios from 'axios';
import { useContext, useEffect, useState } from 'react'; // useContext 제거
import { DifficultyContext } from '../Context/DifficultyContext'; 
import { boardToFen } from '../Service/Format/boardToFen';

export default function useBestMove(board, currentTurn,halfmoveClock,fullmoveNumber) {

  // ContextAPI - 난이도 변수
  const { difficulty } = useContext(DifficultyContext);

  const [bestMove, setBestMove] = useState(null); 

  useEffect(() => {
    if (currentTurn === 'black') {
      const apiUrl = 'https://stockfish.online/api/stockfish.php';
      const fetchBestMove = async () => {
        try {
          const fen = boardToFen(board, "b", halfmoveClock, fullmoveNumber);
          console.log("ai 잘 가나? : ",fen);
          let depth = 5;
          if (difficulty === "Normal") { depth = 9; }
          else if (difficulty === "Hard") { depth = 13; }
          const response = await axios.get(apiUrl, {
            params: {
              fen: fen,
              depth: depth,
              mode: 'bestmove'
            }
          });
          if (response.data !== undefined && response.data !== null) {
            setBestMove(response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchBestMove();
    }
  }, [board, currentTurn]);
  
  

  return bestMove
}


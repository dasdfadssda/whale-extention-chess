export const handlePawnPromotion = (newBoard, toX, toY) => {
    const pieceType = prompt(
      "Pawn reached the end! Please enter a number for the piece type you want: 0 for Queen, 1 for Rook, 2 for Bishop, 3 for Knight",
      "0"
    );
   switch (pieceType) {
      case "0":
        newBoard[toX][toY].type = "퀸";
        break;
      case "1":
        newBoard[toX][toY].type = "룩";
        break;
      case "2":
        newBoard[toX][toY].type = "비숍";
        break;
      case "3":
        newBoard[toX][toY].type = "나이트";
        break;
      default:
        alert("Invalid input! Setting to Queen by default.");
        newBoard[toX][toY].type = "퀸";
        break;
    }
    return newBoard;
  }
  
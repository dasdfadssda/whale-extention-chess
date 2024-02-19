export const generateMoveString = (fromX, fromY, toX, toY, pieceType) => {
    let moveString = '';
  
    // 체스 말의 종류에 따라 문자열에 표현
    switch (pieceType) {
      case 'king':
        moveString += 'K';
        break;
      case 'queen':
        moveString += 'Q';
        break;
      case 'rook':
        moveString += 'R';
        break;
      case 'bishop':
        moveString += 'B';
        break;
      case 'knight':
        moveString += 'N';
        break;
      case 'pawn':
        // 폰의 경우 특별히 표현
        break;
      default:
        break;
    }
  
    // 이동한 위치 추가
    moveString += String.fromCharCode(toY + 97);
    moveString += 8 - toX;
  
    return moveString;
  };
  
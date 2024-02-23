// 나의 말 움직임을 알제브레익으로 변환하는 함수
export const generateMoveString = (to, pieceType) => {
  let moveString = '';
  const [toX, toY] = to;

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
      // 폰의 경우 특별히 표현하지 않습니다.
      break;
    default:
      break;
  }

  // 이동한 위치 추가
  moveString += String.fromCharCode(toY + 97);
  moveString += 8 - toX;

  // 폰이 끝에 도착했을 때 특별한 처리
  if (pieceType === 'pawn' && (toX === 0 || toX === 7)) {
    moveString += '=Q'; // 무조건 퀸으로 승급
  }

  return moveString;
};

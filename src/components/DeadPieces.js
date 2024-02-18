import styled from "styled-components";
import PIECES_IMAGE from "../Static/Constants/ChessImg";

// 죽은말 컴포넌트
function DeadPieces({ color, pieces }) {
  return (
    <Div>
      <DeadPiecesContainer color={color}>
        {Array(Math.ceil(pieces.length / 5))
          .fill()
          .map((_, rowIndex) => (
            <PiecesRow key={rowIndex}>
              {pieces
                .slice(rowIndex * 5, (rowIndex + 1) * 5)
                .map((piece, index) => (
                  <PieceImage
                  key={index}
                  src={require(`../Static${
                    PIECES_IMAGE[piece.type.toLowerCase()][color]
                  }`)}
                  alt={piece.type}
                  pieceType={piece.type.toLowerCase()}
                />
                ))}
            </PiecesRow>
          ))}
      </DeadPiecesContainer>
    </Div>
  );
}

export default DeadPieces;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 12px;
  margin-left: -20px;
`;

const DeadPiecesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: ${(props) =>
    props.color === "black" ? "#E5E5E5" : "black"};
  border: 1px solid ${(props) => (props.color === "white" ? "white" : "black")};
  padding: 0.5rem;
  border-radius: 12px;
`;

const PiecesRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PieceImage = styled.img`
  width: ${({ pieceType }) => (pieceType === "pawn" ? "5vw" : "6vw")}; 
  margin: 1vw;
  min-width: 3vw;
  height: auto;
`;
import React from "react";
import styled from "styled-components";

// Dialog Components
function ConfirmationDialog({dialogOpen, setDialogOpen, yesNavigate, noNavigate, message, yesText, noText}) {
  return (
    dialogOpen && (
      <Dialog>
        <DialogContent>
          {message}
          <RowDiv>
            <DialogButton
              color="#000000"
              borderColor="#E8E6E5"
              backGrounColor="#E8E6E5"
              onClick={() => {
                setDialogOpen(false);
                noNavigate && noNavigate();
              }}
            >
              {noText}
            </DialogButton>
            <DialogButton
              color="white"
              borderColor="white"
              onClick={() => {
                yesNavigate && yesNavigate();
              }}
            >
              {yesText}
            </DialogButton>
          </RowDiv>
        </DialogContent>
      </Dialog>
    )
  )
}

export default ConfirmationDialog;

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContent = styled.div`
  font-family: ${({ theme }) => theme.font};
  font-size: 4.6154vw;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 8px;
  width: 80vw;
  padding: 1rem 0rem;
  text-align: center;
  margin-bottom: 30px;
`;

const RowDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 7.6923vw;
  justify-content: space-around;
`;

const DialogButton = styled.div`
  width: 25vw;
  border-radius: 4vw;
  border: ${(props) => `3px solid ${props.borderColor}`};
  background-color: ${(props) => props.backGrounColor};
  font-size: 6vw;
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 10px;
`;

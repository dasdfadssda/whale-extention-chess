import React, { useContext } from "react";
import styled from "styled-components";
import { TimerContext } from "../Context/TimerContext";

function ConfirmationDialog({
  dialogOpen,
  setDialogOpen,
  onButtonClick,
  yesNavigate,
  noNavigate,
  message,
  yesText,
  noText,
}) {
  const { setTimeState } = useContext(TimerContext);

  // meeage만 입력 받는 경우 검사
  if (yesText && noText) {
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
                  setTimeState(0);
                }}
              >
                {noText}
              </DialogButton>
              <DialogButton
                color="white"
                borderColor="white"
                onClick={() => {
                  yesNavigate && yesNavigate();
                  setDialogOpen(false);
                  setTimeState(0);
                  onButtonClick();
                }}
              >
                {yesText}
              </DialogButton>
            </RowDiv>
          </DialogContent>
        </Dialog>
      )
    );
  } else {
    // message만 입력받은 경우의 UI

    return (
      dialogOpen && (
        <Dialog>
          <MessageContent>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-30px",
                marginBottom: "15px",
              }}
            >
              <CloseButton onClick={() => setDialogOpen(false)}>
                <img src={require("../Static/Assets/CancleIcon.png")} />
              </CloseButton>
            </div>
            {message}
          </MessageContent>
        </Dialog>
      )
    );
  }
}

export default ConfirmationDialog;

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
  border-radius: 12px;
  width: 80vw;
  padding: 1rem 1rem;
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
  width: 30vw;
  border-radius: 4vw;
  border: ${(props) => `3px solid ${props.borderColor}`};
  background-color: ${(props) => props.backGrounColor};
  font-size: 4vw;
  color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2vw 10px;
`;

const MessageContent = styled(DialogContent)`
  min-height: 30vw;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  font-size: 4.6154vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  width: 5vw;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 5vw;
    height: auto;
  }
`;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import styled from "styled-components";

function Timer() {
  // 시간초 state
  const [seconds, setSeconds] = useState(0);
  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  // navigate
  const navigate = useNavigate();

  // 타이머 ID를 저장할 ref
  const timer = useRef(null);

  // 시간 계산
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 시간초 초/분 단위 변환 포멧
  const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
  const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");

  // 타이머 중지 핸들러
  const handleStopClick = () => {
    clearInterval(timer.current);
    setDialogOpen(true);
  };

  return (
    <Div>
      <TimeChecker>
        <ClockIcon src={require("../Static/Assets/ClockIcon.png")} />
        {formattedMinutes}:{formattedSeconds}
      </TimeChecker>
      <StopButton onClick={handleStopClick}>
        <PauseImage src={require("../Static/Assets/StopIcon.png")} />
      </StopButton>
      {dialogOpen && (
        <Dialog>
          <DialogContent>
            Do you want to leave?
            <RowDiv>
              <DialogButton
                color="#000000"
                borderColor="#E8E6E5"
                backGrounColor="#E8E6E5"
                onClick={() => setDialogOpen(false)}
              >
                No
              </DialogButton>
              <DialogButton
                color="white"
                borderColor="white"
                onClick={() => navigate(ROUTES.HOME)}
              >
                Yes
              </DialogButton>
            </RowDiv>
          </DialogContent>
        </Dialog>
      )}
    </Div>
  );
}

export default Timer;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25vw;
`;

const TimeChecker = styled.div`
  width: 33vw;
  border-radius: 3.5vw;
  border: 3px solid white;
  font-size: 6vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 10px;
  margin-left: 22vw;
`;

const ClockIcon = styled.img`
  width: 7vw;
  height: auto;
  margin-right: 10px;
`;

const StopButton = styled.button`
  width: 10vw;
  height: auto;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-left: 16vw;
  &:active {
    filter: brightness(70%);
  }
  cursor: pointer;
`;

const PauseImage = styled.img`
  height: auto;
  width: 90%;
  padding: 0 30px;
`;

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
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

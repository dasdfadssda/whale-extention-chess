import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TimerContext } from "../Context/TimerContext";
import { formatMinutesAndSeconds } from "../Service/Format/formatMinutesAndSeconds";
import ConfirmationDialog from "./Dialog";
import ROUTES from "../Static/Constants/route";

function Timer({ onButtonClick }) {
  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  // navigate hook 선언
  const navigate = useNavigate();
  // ContextAPI 선언 - Timer 변수
  const { timeState, setTimeState } = useContext(TimerContext);

  // 타이머 ID를 저장할 ref
  const timer = useRef(null);

  // 시간 계산
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeState((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 타이머 중지 핸들러
  const handleStopClick = () => {
    clearInterval(timer.current);
    setDialogOpen(true);
  };

  return (
    <Div>
      <TimeChecker>
        <ClockIcon src={require("../Static/Assets/ClockIcon.png")} />
        {formatMinutesAndSeconds(timeState)}
      </TimeChecker>
      <StopButton onClick={handleStopClick}>
        <PauseImage src={require("../Static/Assets/StopIcon.png")} />
      </StopButton>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        onButtonClick={onButtonClick}
        yesNavigate={() => navigate(ROUTES.HOME)}
        message="Do you want to leave?"
        yesText="Yes"
        noText="No"
      />
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
  width: 100%;
  padding: 0 30px;
`;

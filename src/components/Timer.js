import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedSeconds = String(Math.floor(seconds % 60)).padStart(2, "0");
  const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");

  return (
    <Div>
      <TimeChecker>
        <ClockIcon src={require("../Static/Assets/ClockIcon.png")} />
        {formattedMinutes}:{formattedSeconds}
      </TimeChecker>
    </Div>
  );
}

export default Timer;

const Div = styled.div`
  /* background-color: white; */
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
  margin-top: 10px;
`;

const TimeChecker = styled.div`
  width: 25vw;
  border-radius: 12px;
  border: 3px solid white;
  font-size: 4vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1px 10px;
`;

const ClockIcon = styled.img`
  width: 5.1282vw;
  height: auto;
  margin-right: 10px;
`;

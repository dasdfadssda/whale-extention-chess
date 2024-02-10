import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import React, { useContext, useState, useEffect } from "react";
import { DifficultyContext } from "../Context/DifficultyContext";
import { formatMinutesAndSeconds } from "../Service/Format/formatMinutesAndSeconds";

function HomePage() {
  // ContextAPI - 난이도 변수
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  // 사용자의 최단 기록 state
  const [shortestRecord, setShortestRecord] = useState("00:00");
  // 게임 진행 수 state
  const [currentGameCount, setCurrentGameCount] = useState(0);
  // 전속자 수 state
  const [currentVisitorCount, setCurrentVisitorCount] = useState(0);

  // 난이도 버튼 핸들러
  const handleDifficultyClick = (newDifficulty) => {
    if (newDifficulty === difficulty) {
      setDifficulty("");
    } else {
      setDifficulty(newDifficulty);
    }
  };

  // 페이지 이동 핸들러
  const navigate = useNavigate();
  const handleButtonClick = (route) => {
    navigate(route);
    setDifficulty("");
    setCurrentGameCount(1);
    setCurrentVisitorCount(1);
  };

  // 최단 기록 불러오기
  useEffect(() => {
    const shortestTime = localStorage.getItem('shortestTime');
    if (shortestTime) {
      const time = Number(shortestTime);
      setShortestRecord(formatMinutesAndSeconds(time));
    }
  }, []);

  return (
    <>
      <Column>
        <TitleText>PLAY CHESS</TitleText>
      </Column>
      <Row height={31.2821}>
        <Button
          color={"#D66602"}
          onClick={() => handleButtonClick(ROUTES.RANKING)}
        >
          <Column color={"Tradn"} content="flex-end">
            <SmallText color={"#FFFFFF"} style={{ marginTop: "2vw" }}>
              Best Record
            </SmallText>
            <div
              style={{
                fontSize: "10.5vw",
                color: "white",
                minWidth: "35vw",
                marginTop: "2vw",
              }}
            >
              {shortestRecord}
            </div>
          </Column>
        </Button>
        <Button>
          <Column content="center">
            <SmallText color={"black"} style={{ marginTop: "2vw" }}>
              Games Today
            </SmallText>
            <div
              style={{
                fontSize: "10.5vw",
                color: "black",
                minWidth: "35vw",
                marginTop: "2vw",
              }}
            >
              {currentGameCount}
            </div>
          </Column>
        </Button>
      </Row>
      <Row height={31.2821}>
        <Button
          style={{
            width: "33%",
            backgroundColor: difficulty === "Easy" ? "#D66602" : "#fff",
          }}
          onClick={() => handleDifficultyClick("Easy")}
        >
          <div
            style={{
              fontSize: "4.1026vw",
              color: difficulty === "Easy" ? "#FFFFFF" : "black",
            }}
          >
            EASY
          </div>
          <div
            style={{
              fontSize: "17.9487vw",
              color: difficulty === "Easy" ? "#FFFFFF" : "black",
              marginTop: "-30px",
              marginBottom: "-30px",
            }}
          >
            E
          </div>
        </Button>
        <Button
          style={{
            width: "33%",
            backgroundColor: difficulty === "Normal" ? "#D66602" : "#fff",
          }}
          onClick={() => handleDifficultyClick("Normal")}
        >
          <div
            style={{
              fontSize: "4.1026vw",
              color: difficulty === "Normal" ? "#FFFFFF" : "black",
            }}
          >
            NORMAL
          </div>
          <div
            style={{
              fontSize: "17.9487vw",
              color: difficulty === "Normal" ? "#FFFFFF" : "black",
              marginTop: "-30px",
              marginBottom: "-30px",
            }}
          >
            N
          </div>
        </Button>
        <Button
          style={{
            width: "33%",
            backgroundColor: difficulty === "Hard" ? "#D66602" : "#fff",
          }}
          onClick={() => handleDifficultyClick("Hard")}
        >
          <div
            style={{
              fontSize: "4.1026vw",
              color: difficulty === "Hard" ? "#FFFFFF" : "black",
            }}
          >
            HARD
          </div>
          <div
            style={{
              fontSize: "17.9487vw",
              color: difficulty === "Hard" ? "#FFFFFF" : "black",
              marginTop: "-30px",
              marginBottom: "-30px",
            }}
          >
            H
          </div>
        </Button>
      </Row>
      <Row height={25.641}>
        <PlayButton
          style={{ fontSize: "17.9487vw" }}
          onClick={() => handleButtonClick(ROUTES.CHESS)}
          disabled={!difficulty}
        >
          PLAY
        </PlayButton>
      </Row>
    </>
  );
}

export default HomePage;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  height: ${({ height }) => height || "auto"}vw;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: "center";
  align-items: ${({ content }) => content || "center"};
  margin: 0 5px;
  margin-bottom: 2.5641vw;
  background-color: ${({ color }) => color || "#F2F2F2"};
  border-radius: 8px;
`;

const TitleText = styled.div`
  font-size: 20vw;
  font-family: ${({ theme }) => theme.font};
  color: #000;
  background-color: #f2f2f2;
  line-height: 1;
  text-align: center;
  padding : 8vw 0vw;
  border-radius: 8px;
`;


const SmallText = styled.div`
  font-size: 3.5897vw;
  margin-bottom: -10px;
  color: ${({ color }) => color || "#000000"};
`;

const Button = styled.button`
  flex-grow: 1;
  margin: 0 5px;
  padding: 10px;
  font-family: ${({ theme }) => theme.font};
  background-color: ${({ color }) => color || "#F2F2F2"};
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:active {
    filter: brightness(70%);
  }
  cursor: pointer;
`;
const PlayButton = styled.button`
  flex-grow: 1;
  margin: 0 5px;
  padding: 10px;
  font-family: ${({ theme }) => theme.font};
  background-color: ${({ color }) => color || "#F2F2F2"};
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.disabled ? "#fff" : "#D66602")};
  color: ${(props) => (props.disabled ? "#E5E5E5" : "white")};

  &:active {
    filter: brightness(70%);
  }
  cursor: pointer;
`;

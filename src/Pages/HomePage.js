import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import React, { useContext, useState, useEffect } from "react";
import { DifficultyContext } from "../Context/DifficultyContext";
import { useUser } from '../Context/UserContext'; 
import { formatMinutesAndSeconds } from "../Service/Format/formatMinutesAndSeconds";
import ConfirmationDialog from "../Components/Dialog";
import NaverLoginButton from "../Components/NaverLoginButton";

function HomePage() {
  // ContextAPI - 난이도 변수
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  // ContextAPI - 사용자 정보 변수
  const { user } = useUser(); 
  // 사용자의 최단 기록 state
  const [shortestRecord, setShortestRecord] = useState("00:00");
  // 게임 진행 수 state
  const [currentGameCount, setCurrentGameCount] = useState(0);
  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  // 난이도 관리 State
  const [isHardAccess, setIsHardAccess] = useState(false);
  const [isNormalAccess, setIsNormalAccess] = useState(false);

  // 난이도 버튼 변수
  const difficulties = [
    { name: "Easy", access: true, key: "E" },
    { name: "Normal", access: isNormalAccess, key: "N" },
    { name: "Hard", access: isHardAccess, key: "H" },
  ];

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
    if (route === '/chess' && !difficulty) {
      setDialogOpen(true);
    } else {
      navigate(route);
      setDifficulty("");
      setCurrentGameCount(1);
    }
  };

  // 최단 기록 불러오기
  useEffect(() => {
    const shortestTime = localStorage.getItem("shortestTime");
    if (shortestTime) {
      const time = Number(shortestTime);
      setShortestRecord(formatMinutesAndSeconds(time));
    }
  }, []);

  // 사용자 정보에 따른 난이도 lock 관리
  useEffect(() => {
    if (user) {
      setIsNormalAccess(user.gameInfo.normal.access);
      setIsHardAccess(user.gameInfo.hard.access);
    }
  }, [user]);

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
        {difficulties.map(({ name, access, key }) => {
          if (access) {
            return (
              <Button
                style={{
                  width: "33%",
                  backgroundColor: difficulty === name ? "#D66602" : "#fff",
                }}
                onClick={() => handleDifficultyClick(name)}
              >
                <div
                  style={{
                    fontSize: "4.1026vw",
                    color: difficulty === name ? "#FFFFFF" : "black",
                  }}
                >
                  {name.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: "17.9487vw",
                    color: difficulty === name ? "#FFFFFF" : "black",
                    marginTop: "-30px",
                    marginBottom: "-30px",
                  }}
                >
                  {key}
                </div>
              </Button>
            );
          } else {
            return (
              <img
                src={require(`../Static/Assets/Lock${name}Icon.png`)}
                alt="lock icon"
                style={{ margin: "0 5px", flexGrow: "1" }}
              />
            );
          }
        })}
      </Row>
      <Row height={25.641}>
        <PlayButton
          style={{ fontSize: "17.9487vw" }}
          onClick={() => handleButtonClick(ROUTES.CHESS)}
          disabledState={!difficulty}
        >
          PLAY
        </PlayButton>
      </Row>
      <ConfirmationDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        message={
          <>
            Please select
            <br />a difficulty to play
          </>
        }
      />
      <NaverLoginButton />
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
  padding: 8vw 0vw;
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
  background-color: ${(props) => (props.disabledState ? "#fff" : "#D66602")};
  color: ${(props) => (props.disabledState ? "#E5E5E5" : "white")};

  &:active {
    filter: brightness(70%);
  }
  cursor: pointer;
`;

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import React, { useContext } from "react";
import { DifficultyContext } from "../Context/DifficultyContext";

function HomePage() {
  const navigate = useNavigate();

  // ContextAPI - 난이도 변수
  const { difficulty, setDifficulty } = useContext(DifficultyContext);

  // 난이도 버튼 핸들러
  const handleDifficultyClick = (newDifficulty) => {
    if (newDifficulty === difficulty) {
      setDifficulty("");
    } else {
      setDifficulty(newDifficulty);
    }
  };

  const handleButtonClick = () => {
    navigate(ROUTES.CHESS);
  };

  return (
    <>
      <Column>
        <TitleText>PLAY CHESS</TitleText>
        <RowDiv>
          <Column>
            <SmallText>Games Today</SmallText>
            <MidleText>607</MidleText>
          </Column>
          <Column>
            <SmallText>Playing now</SmallText>
            <MidleText>76</MidleText>
          </Column>
        </RowDiv>
      </Column>
      <Row height={31.2821}>
        <Button color={"#D66602"}>
          <Column color={"Tradn"} content="flex-end">
            <SmallText color={"#FFFFFF"}>Best Record</SmallText>
            <div style={{ fontSize: "10.5vw", color: "white" }}>10:45</div>
          </Column>
        </Button>
        <Button>
          <SettingImage src={require("../Static/Assets/SettingImg.png")} />
        </Button>
      </Row>
      <Row height={31.2821}>
        <Button
          style={{
            width: "33%",
            backgroundColor: difficulty === "Easy" ? "#ddd" : "#fff",
          }}
          onClick={() => handleDifficultyClick("Easy")}
        >
          <div
            style={{
              fontSize: "4.1026vw",
              color: difficulty === "Easy" ? "#D66602" : "black",
            }}
          >
            EASY
          </div>
          <div
            style={{
              fontSize: "17.9487vw",
              color: difficulty === "Easy" ? "#D66602" : "black",
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
            backgroundColor: difficulty === "Normal" ? "#ddd" : "#fff",
          }}
          onClick={() => handleDifficultyClick("Normal")}
        >
          <div
            style={{
              fontSize: "4.1026vw",
              color: difficulty === "Normal" ? "#D66602" : "black",
            }}
          >
            NORMAL
          </div>
          <div
            style={{
              fontSize: "17.9487vw",
              color: difficulty === "Normal" ? "#D66602" : "black",
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
            backgroundColor: difficulty === "Hard" ? "#ddd" : "#fff",
          }}
          onClick={() => handleDifficultyClick("Hard")}
        >
          <div
            style={{
              fontSize: "4.1026vw",
              color: difficulty === "Hard" ? "#D66602" : "black",
            }}
          >
            HARD
          </div>
          <div
            style={{
              fontSize: "17.9487vw",
              color: difficulty === "Hard" ? "#D66602" : "black",
              marginTop: "-30px",
              marginBottom: "-30px",
            }}
          >
            H
          </div>
        </Button>
      </Row>
      <Row height={25.641}>
        <Button
          style={{ fontSize: "17.9487vw" }}
          onClick={handleButtonClick}
          disabled={!difficulty}
        >
          PLAY
        </Button>
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

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 27vw;
`;

const TitleText = styled.div`
  font-size: 18vw;
  font-family: ${({ theme }) => theme.font};
  color: #000;
  background-color: #f2f2f2;
  line-height: 1;
  text-align: center;
  padding-top: 2.5641vw;
`;

const MidleText = styled.div`
  font-size: 12.8205vw;
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
`;

const SettingImage = styled.img`
  height: auto;
  width: 90%;
  padding: 0 30px;
`;

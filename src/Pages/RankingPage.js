import React, { useState } from "react";
import styled from "styled-components";

const RankingPage = () => {
  // 선택된 버튼 state
  const [selectedButton, setSelectedButton] = useState("Easy");

  // 선택 state 관리
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  // 더미데이터 값 선언
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomTime() {
    const minutes = getRandomInt(0, 59).toString().padStart(2, "0");
    const seconds = getRandomInt(0, 59).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  const difficulties = ["easy", "normal", "hard"];

  const dummyData = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    difficulty: difficulties[getRandomInt(0, difficulties.length - 1)],
    user: `User${i + 1}`,
    time: getRandomTime(),
  }));

  // 난이도 버튼 변수들
  const buttonNames = ["Easy", "Normal", "Hard"];

  return (
    <Div>
      <TitleText>Best Records</TitleText>
      <RowDiv>
        {buttonNames.map((buttonName) => (
          <TextButton
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            selected={selectedButton === buttonName}
          >
            {buttonName}
          </TextButton>
        ))}
      </RowDiv>
      <RankList>
        {dummyData
          .filter((data) => data.difficulty === selectedButton.toLowerCase())
          // 시간 순으로 오름차순 sorting
          .sort((a, b) => {
            const aTime = a.time
              .split(":")
              .reduce((acc, time) => 60 * acc + +time);
            const bTime = b.time
              .split(":")
              .reduce((acc, time) => 60 * acc + +time);
            return aTime - bTime;
          })
          .map((data, index) => (
            <RankItem key={data.id} index={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <RankingNum>{index + 1}</RankingNum>
                <div>{data.user}</div>
              </div>
              <div>{data.time}</div>
            </RankItem>
          ))}
      </RankList>
    </Div>
  );
};

export default RankingPage;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
  justify-content: center;
  align-items: center;
  width: 98%;
`;

const TitleText = styled.div`
  font-size: 10vw;
  font-family: ${({ theme }) => theme.font};
  color: #000;
  line-height: 1;
  text-align: start;
  padding-top: 12vw;
  padding-left: 7vw;
  color: white;
  width: 100%;
`;

const RowDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 8vw;
  margin-top: 4vw;
  padding: 0 10px;
`;

const TextButton = styled.button`
  font-family: ${({ theme }) => theme.font};
  font-size: 5vw;
  color: ${(props) => (props.selected ? "#ffffff" : "#AFAFAF")};
  background-color: transparent;
  border: none;
  text-align: center;
  display: inline-block;
  cursor: pointer;
`;

const RankList = styled.div`
  height: 90vw;
  width: 100%;
  overflow-y: scroll;
  margin-top: 10px;
`;

const RankItem = styled.div`
  background-color: ${(props) => {
    if (props.index === 0) return "#FFDC4D";
    if (props.index === 1) return "#D9D9D9";
    if (props.index === 2) return "#FFB546";
    return "aliceblue";
  }};
  padding: 1.5vw 3vw;
  margin-top: 10px;
  display: flex;
  font-family: ${({ theme }) => theme.font};
  font-size: 5.1282vw;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
`;

const RankingNum = styled.div`
  border-radius: 50%;
  background-color: black;
  font-size: 3.5897vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 6.5vw;
  margin-right: 5vw;
`;

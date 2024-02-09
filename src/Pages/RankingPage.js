import React, { useState } from "react";
import styled from "styled-components";

const RankingPage = () => {
  // 선택된 버튼 state
  const [selectedButton, setSelectedButton] = useState("Easy");

  // 선택 state 관리
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <Div>
      <TitleText>Best Records</TitleText>
      <RowDiv>
        <TextButton
          onClick={() => handleButtonClick("Easy")}
          selected={selectedButton === "Easy"}
        >
          Easy
        </TextButton>
        <TextButton
          onClick={() => handleButtonClick("Normal")}
          selected={selectedButton === "Normal"}
        >
          Normal
        </TextButton>
        <TextButton
          onClick={() => handleButtonClick("Hard")}
          selected={selectedButton === "Hard"}
        >
          Hard
        </TextButton>
      </RowDiv>
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
  width: 100%;
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
`;

const TextButton = styled.button`
  font-family: ${({ theme }) => theme.font};
  font-size: 6vw;
  color: ${(props) => (props.selected ? "#ffffff" : "#AFAFAF")};
  background-color: transparent;
  border: none;
  text-align: center;
  display: inline-block;
  cursor: pointer;
`;

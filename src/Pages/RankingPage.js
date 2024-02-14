import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fetchScoreData from "../Service/Score/GetSocreData";
import { formatMinutesAndSeconds } from "../Service/Format/formatMinutesAndSeconds";

const RankingPage = () => {
  // 선택된 버튼 state
  const [selectedButton, setSelectedButton] = useState("Easy");

  // Firebase에서 가져온 점수 데이터를 저장할 state 추가
  const [scores, setScores] = useState([]);

  // Firebase에서 데이터를 가져와서 scores state 업데이트
  const fetchScores = async (difficulty) => {
    try {
      const scoreData = await fetchScoreData(difficulty);
      setScores(scoreData);
    } catch (error) {
      console.error("Error fetching score data:", error);
    }
  };

  // 선택된 어려움 수준에 따라 버튼 클릭 핸들러
  const handleButtonClick = (difficulty) => {
    setSelectedButton(difficulty);
    fetchScores(difficulty);
  };

  // 처음 Easy 난이도 읽기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoreData = await fetchScoreData(selectedButton);
        setScores(scoreData);
      } catch (error) {
        console.error("Error fetching score data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Title>Best Records</Title>
      <ButtonGroup>
        {["Easy", "Normal", "Hard"].map((buttonName) => (
          <Button
            key={buttonName}
            onClick={() => handleButtonClick(buttonName)}
            selected={selectedButton === buttonName}
          >
            {buttonName}
          </Button>
        ))}
      </ButtonGroup>
      <RankList>
        {scores.map((data, index) => (
          <RankItem key={index} index={index}>
            <div style={{ display: "flex" }}>
              <RankingNumber>{index + 1}</RankingNumber>
              <NameDiv>{data.name}</NameDiv>
            </div>
            <div>{formatMinutesAndSeconds(data.time)}</div>
          </RankItem>
        ))}
      </RankList>
    </Container>
  );
};

export default RankingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
  justify-content: center;
  align-items: center;
  width: 98%;
`;

const Title = styled.div`
  font-size: 10vw;
  font-family: ${({ theme }) => theme.font};
  color: white;
  line-height: 1;
  text-align: start;
  padding-top: 12vw;
  padding-left: 7vw;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 8vw;
  margin-top: 4vw;
  padding: 0 10px;
`;

const Button = styled.button`
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
  background-color: ${({ index }) =>
    index === 0
      ? "#FFDC4D"
      : index === 1
      ? "#D9D9D9"
      : index === 2
      ? "#FFB546"
      : "aliceblue"};
  padding: 1.5vw 3vw;
  margin-top: 10px;
  display: flex;
  font-family: ${({ theme }) => theme.font};
  font-size: 5.1282vw;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
`;

const RankingNumber = styled.div`
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

const NameDiv = styled.div`
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
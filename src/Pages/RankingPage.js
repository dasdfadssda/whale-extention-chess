import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import fetchScoreData from "../Service/Score/GetSocreData";
import { formatMinutesAndSeconds } from "../Service/Format/formatMinutesAndSeconds";
import { useUser } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../Static/Constants/route";
import { DifficultyContext } from "../Context/DifficultyContext";
import { convertToRomanized } from "../Service/Format/convertToRomanized";
import { PacmanLoader } from "react-spinners";
import { Ranking } from "../Styles/LoadingSpin";

const RankingPage = () => {
  // ContextAPI - 사용자 정보 변수
  const { user } = useUser();
  // ContextAPI - 난이도 변수
  const { difficulty, setDifficulty } = useContext(DifficultyContext);
  // 선택된 버튼 state
  const [selectedButton, setSelectedButton] = useState(difficulty || "Easy");
  // Firebase에서 가져온 점수 데이터를 저장할 state 추가
  const [scores, setScores] = useState([]);
  // user ranking 선언
  const [userRank, setUserRank] = useState(null);
  // Firebase에서 데이터를 가져와서 scores state 업데이트
  const fetchScores = async (difficulty) => {
    try {
      const scoreData = await fetchScoreData(difficulty);
      setScores(scoreData);
    } catch (error) {
      console.error("Error fetching score data:", error);
    }
  };

  // useNavigate 선언
  const navigate = useNavigate();

  // 선택된 어려움 수준에 따라 버튼 클릭 핸들러
  const handleButtonClick = (difficulty) => {
    setSelectedButton(difficulty);
    fetchScores(difficulty);
  };

  // 사용자의 등수 가져오기
  const getUserRank = (scoreData) => {
    if (!user.id || scoreData.length === 0) return null;

    const validScores = scoreData.filter((score) => score.time !== 0);
    const sortedScores = [...validScores].sort((a, b) => a.time - b.time);
    console.log("sortedScores :", sortedScores);
    const userScore = validScores.find((score) => score.id === user.id);

    if (!userScore || userScore.time === 0) {
      return null;
    }

    let rank = 1;
    for (let score of sortedScores) {
      if (score.time < userScore.time) {
        rank++;
      } else if (score.time === userScore.time && score.id !== user.id) {
        rank++;
      } else {
        break;
      }
    }
    return rank;
  };

  // 처음 Easy 난이도 읽기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoreData = await fetchScoreData(selectedButton);
        console.log("difficulty :", selectedButton, "scores : ", scoreData);

        const userRank = getUserRank(scoreData);
        console.log("userRank : ", userRank);

        setScores(scoreData);
        setUserRank(userRank);
      } catch (error) {
        console.error("Error fetching score data:", error);
      }
    };

    fetchData();
  }, [selectedButton]);

  return (
    <Container>
      <TopDiv>
        <BackIcon
          onClick={() => {
            navigate(ROUTES.HOME);
            setDifficulty("");
          }}
        >
          <img
            src={require("../Static/Assets/BackIcon.png")}
            alt="뒤로 가기 아이콘"
          />
        </BackIcon>
      </TopDiv>
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
        {scores ? (
          <>
            {scores
              .filter(
                (data) =>
                  (userRank !== null || data.id !== user.id) && data.time >= 1
              )
              .slice(0, 5)
              .map((data, index) => (
                <RankItem key={index} userId={user.id} DataId={data.id}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <RankingNumber
                      index={index}
                      userId={user.id}
                      DataId={data.id}
                    >
                      {index + 1}
                    </RankingNumber>
                    <NameDiv userId={user.id} DataId={data.id}>
                      {convertToRomanized(data.name)}
                    </NameDiv>
                  </div>
                  <TimeDiv userId={user.id} DataId={data.id}>
                    {formatMinutesAndSeconds(data.time)}
                  </TimeDiv>
                </RankItem>
              ))}
            {userRank !== null && userRank > 5 && (
              <RankItem>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RankingNumber>{userRank}</RankingNumber>
                  <NameDiv>{convertToRomanized(user.name)}</NameDiv>
                </div>
                <TimeDiv>
                  {typeof userRank === "number"
                    ? formatMinutesAndSeconds(
                        scores.find((score) => score.id === user.id).time
                      )
                    : userRank}
                </TimeDiv>
              </RankItem>
            )}
            {userRank === null && (
              <RankItem content={"center"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <NoRankText>You have to play the game</NoRankText>
                </div>
              </RankItem>
            )}
          </>
        ) : (
          <>
            <PacmanLoader color="#D66602" cssOverride={Ranking} size={50} />
          </>
        )}
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

const TopDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-left: -3.0769vw;
`;

const BackIcon = styled.button`
  border: none;
  background-color: transparent;
  margin-bottom: 7vw;
  margin-top: 2vw;
  width: 10vw;
  cursor: pointer;
  img {
    max-width: 85%;
    max-height: 85%;
  }
`;

const Title = styled.div`
  font-size: 10.5vw;
  font-family: ${({ theme }) => theme.font};
  color: white;
  line-height: 1;
  text-align: start;
  padding-left: 7vw;
  width: 95%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 8vw;
  margin-top: 4vw;
  padding: 0 2.5641vw;
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
  height: 100vw;
  width: 97%;
  overflow-y: scroll;
  margin-top: 2.5641vw;
  margin-left: 0.7692vw;
`;

const RankItem = styled.div`
  background-color: ${({ userId, DataId }) =>
    userId === DataId ? "#D66602" : "white"};
  padding: 1.5vw 3vw;
  margin-top: 2.5641vw;
  display: flex;
  font-family: ${({ theme }) => theme.font};
  font-size: 5.1282vw;
  justify-content: ${(props) =>
    props.content ? props.content : "space-between"};
  align-items: center;
  border-radius: 3.0769vw;
`;

const RankingNumber = styled.div`
  border-radius: 50%;
  background-color: ${({ index, userId, DataId }) =>
    index === 0
      ? "#FFDC4D"
      : index === 1
      ? "#D9D9D9"
      : index === 2
      ? "#FFB546"
      : userId === DataId
      ? "white"
      : "black"};
  font-size: 3.5897vw;
  color: ${({ userId, DataId }) => (userId === DataId ? "black" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  height: 6.5vw;
  margin-right: 5vw;
`;

const NameDiv = styled.div`
  width: 51.2821vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ userId, DataId }) => (userId === DataId ? "white" : "black")};
  margin-right: 4vw;
`;

const TimeDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 27vw;
  color: ${({ userId, DataId }) => (userId === DataId ? "white" : "black")};
`;

const NoRankText = styled.div`
  color: white;
`;

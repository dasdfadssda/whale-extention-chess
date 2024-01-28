import styled from "styled-components";
import React, { useContext } from "react";
import LanguageComponent from "../Components/LanguageComponent";
import LanguageSelector from "../Components/LanguageSelector";
import { LanguageContext } from "../Context/LanguageContext";
import { ChooseLanguaage } from "../Data/Locales/localesData";

function HomePage() {
  const { languageIndex } = useContext(LanguageContext);

  return (
    <Div>
      <h1>{ChooseLanguaage[languageIndex]}</h1>
      <LanguageSelector />
      <LanguageComponent />
    </Div>
  );
}

export default HomePage;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

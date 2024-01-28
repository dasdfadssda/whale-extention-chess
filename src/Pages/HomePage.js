import styled from "styled-components";
import { LanguageProvider } from "../Context/LanguageContext";
import LanguageComponent from "../Components/LanguageComponent";
import LanguageSelector from "../Components/LanguageSelector";

function HomePage() {
  return (
    <Div>
      <LanguageProvider>
        <h1>언어를 선택해주세요.</h1>
        <LanguageSelector />
        <LanguageComponent />
      </LanguageProvider>
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

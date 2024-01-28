import styled from "styled-components";
import { LanguageProvider } from "./Context/LanguageContext";
import LanguageComponent from "./Components/LanguageComponent";
import LanguageSelector from "./Components/LanguageSelector";

function App() {
  return (
    <Div>
      <LanguageProvider>
      <h1>우하하하 해냈다</h1>
      <LanguageSelector/>
      <LanguageComponent/>
      </LanguageProvider>
    </Div>
  );
}

export default App;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

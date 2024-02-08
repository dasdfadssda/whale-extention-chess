import { HashRouter as Switch, Route, Routes } from "react-router-dom";
import { DifficultyProvider } from "./Context/DifficultyContext";
import HomePage from "./Pages/HomePage";
import ChessBoard from "./Pages/ChessBoard";
import ROUTES from "./Static/Constants/route";
import { ThemeProvider } from "styled-components";
import { theme } from "./Styles/Theme";
import GlobalStyle from "./Styles/GlobalStyle";
import ChessSettings from "./Pages/SettingPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DifficultyProvider>
        <GlobalStyle />
        <Switch>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CHESS} element={<ChessBoard />} />
            <Route path={ROUTES.SETTING} element={<ChessSettings />} />
          </Routes>
        </Switch>
      </DifficultyProvider>
    </ThemeProvider>
  );
}

export default App;

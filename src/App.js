import { HashRouter as Switch, Route, Routes } from "react-router-dom";
import { DifficultyProvider } from "./Context/DifficultyContext";
import HomePage from "./Pages/HomePage";
import ScrollToTop from "./ScrollToTop";
import ChessBoard from "./Pages/ChessBoard";
import ROUTES from "./Static/Constants/route";
import { ThemeProvider } from "styled-components";
import { theme } from "./Styles/Theme";
import GlobalStyle from "./Styles/GlobalStyle";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DifficultyProvider>
        <GlobalStyle />
        <Switch>
          <ScrollToTop />
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.CHESS} element={<ChessBoard />} />
          </Routes>
        </Switch>
      </DifficultyProvider>
    </ThemeProvider>
  );
}

export default App;

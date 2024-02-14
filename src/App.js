import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { DifficultyProvider } from "./Context/DifficultyContext";
import HomePage from "./Pages/HomePage";
import ChessBoard from "./Pages/ChessBoard";
import ROUTES from "./Static/Constants/route";
import { ThemeProvider } from "styled-components";
import { theme } from "./Styles/Theme";
import GlobalStyle from "./Styles/GlobalStyle";
import ChessSettings from "./Pages/SettingPage";
import RankingPage from "./Pages/RankingPage";
import { TimerProvider } from "./Context/TimerContext";
import CallbackPage from "./Pages/CallbackPage";
import { UserProvider } from "./Context/UserContext";
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    // beforeunload 이벤트 리스너 등록
    window.addEventListener("beforeunload", handleBeforeUnload);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <DifficultyProvider>
            <TimerProvider>
              <GlobalStyle />
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.CHESS} element={<ChessBoard />} />
                <Route path={ROUTES.SETTING} element={<ChessSettings />} />
                <Route path={ROUTES.RANKING} element={<RankingPage />} />
                <Route path={ROUTES.CALLBACK} element={<CallbackPage />} />
              </Routes>
            </TimerProvider>
          </DifficultyProvider>
        </UserProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

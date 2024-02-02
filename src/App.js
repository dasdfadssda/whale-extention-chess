import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./Context/LanguageContext";
import HomePage from "./Pages/HomePage";
import ScrollToTop from "./ScrollToTop";
import ChessBoard from "./Pages/ChessBoard";
import ROUTES from "./Static/Constants/route";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CHESS} element={<ChessBoard />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

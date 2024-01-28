import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./Context/LanguageContext";
import HomePage from "./Pages/HomePage";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

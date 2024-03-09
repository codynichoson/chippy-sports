import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/scripts/Header";
import Menu from "./components/scripts/Menu";
import Footer from "./components/scripts/Footer";

// Import pages
import HomePage from "./pages/scripts/HomePage";
import SportsPage from "./pages/scripts/SportsPage";
import LeaguesPage from "./pages/scripts/LeaguesPage";
import CalendarPage from "./pages/scripts/CalendarPage";
import AFLPage from "./pages/league_pages/scripts/AFLPage";
import NRLPage from "./pages/league_pages/scripts/NRLPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Menu />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/leagues/afl/*" element={<AFLPage />} />
            <Route path="/leagues/nrl" element={<NRLPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

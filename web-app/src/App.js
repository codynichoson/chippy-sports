import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

// Import pages
import HomePage from "./pages/HomePage";
import SportsPage from "./pages/SportsPage";
import LeaguesPage from "./pages/LeaguesPage";
import CalendarPage from "./pages/CalendarPage";
import NRLPage from "./pages/league_pages/NRLPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Menu />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<SportsPage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/leagues/nrl" element={<NRLPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { PublicPage } from "./components/PublicPage";
import { PrivatePage } from "./components/PrivatePage";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <div style={{ background: "#fff" }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/auth">Авторизация</Link>
              </li>
              <li>
                <Link to="/public">Публичная страница</Link>
              </li>
              <li>
                <Link to="/private">Приватная страница</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/auth" element={<LoginPage />} />
            <Route path="/public" element={<PublicPage />} />
            <Route path="/private" element={<PrivatePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./output.css";
import { Biography } from "./pages/biography";
import { Pictures } from "./pages/pictures";
import LogIn from "./pages/login";
import MainLayout from "./layouts/MainLayout";
const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/biography" element={<Biography />} />
          <Route path="/pictures" element={<Pictures />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;

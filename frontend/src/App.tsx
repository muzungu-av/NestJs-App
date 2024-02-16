import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import { Main } from "./pages/Main";
import { SignIn } from "./pages/SignIn";
import { Paintings } from "./pages/Paintings";
import { Dibond } from "./pages/Dibond";
import { Contacts } from "./pages/Contacts";
import { AboutMe } from "./pages/AboutMe";
import { AboutPainting } from "./pages/AboutPainting";

import { ReactNode } from "react";
import "./App.css";
import "./output.css";

const App: React.FC = () => {
  const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") || "";
    if (!token) {
      navigate("/login", { replace: true });
      return null;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/about-me"
          element={
            <PrivateRoute>
              <AboutMe />
            </PrivateRoute>
          }
        />
        <Route path="/paintings" element={<Paintings />} />
        <Route path="/dibond" element={<Dibond />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/painting" element={<AboutPainting />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;

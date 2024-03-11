import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

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
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;

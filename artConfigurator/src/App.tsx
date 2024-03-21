import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

import { ReactNode } from "react";
import "./App.css";
import "./output.css";
import { Biography } from "./pages/Biography";
import MainLayout from ".";
import { AddingEditingPaint } from "./pages/Paint";

const App: React.FC = () => {
  // const PrivateRoute = ({ children }: { children: ReactNode }) => {
  //   const navigate = useNavigate();
  //   const token = localStorage.getItem("token") || "";
  //   if (!token) {
  //     navigate("/login", { replace: true });
  //     return null;
  //   }
  //   return <>{children}</>;
  // };

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SignIn />} /> */}
        <Route
          path="/biography"
          element={
            <MainLayout>
              <Biography />
            </MainLayout>
          }
        />{" "}
        <Route
          path="/add-paint"
          element={
            <MainLayout>
              <AddingEditingPaint isEditMode={false} />
            </MainLayout>
          }
        />{" "}
        <Route
          path="/edit-paint"
          element={
            <MainLayout>
              <AddingEditingPaint isEditMode={true} />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

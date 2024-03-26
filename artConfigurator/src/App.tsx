import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
  // useNavigate
} from "react-router-dom";

// import { ReactNode } from "react";
import "./App.css";
import "./output.css";
import { Biography } from "./pages/biography";
import MainLayout from "./layouts/MainLayout";
import { AddingEditingPaint } from "./pages/Paint";
import { PaintingsKopien } from "./pages/PaintingsKopien";

const App: React.FC = () => {
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
        <Route
          path="/paintings-kopien"
          element={
            <MainLayout>
              <PaintingsKopien />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

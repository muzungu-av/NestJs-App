import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "./pages/Main";
import { Paintings } from "./pages/Paintings";
import Contacts from "./pages/ContactsPage";
import { AboutMe } from "./pages/AboutMe";
import "./App.css";
import "./output.css";
import MainLayout from "./layouts/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/about-me"
          element={
            <MainLayout>
              <AboutMe isMain={false} />
            </MainLayout>
          }
        />
        <Route path="/paintings" element={<Paintings pageType="Gemälde" />} />
        <Route path="/dibond" element={<Paintings pageType="Atelier" />} />
        <Route
          path="/contacts"
          element={
            <MainLayout>
              <Contacts />
            </MainLayout>
          }
        />
        <Route path="/painting" element={<Paintings pageType="Kopien" />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;

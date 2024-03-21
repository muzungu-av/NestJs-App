import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "./pages/Main";
import { Paintings } from "./pages/Paintings";
import { Dibond } from "./pages/Dibond";
import { Contacts } from "./pages/Contacts";
import { AboutMe } from "./pages/AboutMe";
import { AboutPainting } from "./pages/AboutPainting";
import "./App.css";
import "./output.css";
import MainLayout from "./Layouts/MainLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/about-me"
          element={
            <MainLayout>
              <AboutMe isMain={false} />
            </MainLayout>
          }
        /> */}
        <Route path="/paintings" element={<Paintings />} />
        <Route path="/dibond" element={<Dibond />} />
        <Route
          path="/contacts"
          element={
            <MainLayout>
              <Contacts />
            </MainLayout>
          }
        />
        <Route path="/painting" element={<AboutPainting />} />
        <Route path="/about-me" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;

import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "./output.css";
import LogIn from "./pages/login";
import MultiLevelMenu from "./components/menu";
import { menuItemsWithPaths } from "./components/menu/menuItems";

const App: React.FC = () => {
  return (
    <Router>
      <MultiLevelMenu menuItems={menuItemsWithPaths} />
      <Routes>
        <Route path="/" element={<LogIn />} />

        {menuItemsWithPaths.map((item) => (
          <Route
            key={item.id}
            path={item.path}
            element={item.element && <item.element />}
          />
        ))}

        {menuItemsWithPaths.map((item) => {
          if (item.children) {
            return item.children.map((child) => (
              <Route
                key={child.id}
                path={child.path}
                element={<child.element isEditMode={child.isEditMode} />}
              />
            ));
          }
          return null;
        })}
      </Routes>
    </Router>
  );
};

export default App;

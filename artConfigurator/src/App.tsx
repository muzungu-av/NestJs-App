import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import "./output.css";
import LogIn from "./pages/login";
import { AddingEditingKopien } from "./pages/AddingEditingKopien";
import { AddingEditingPaint } from "./pages/Paint";
import { Pictures } from "./pages/pictures";
import { PaintingsKopien } from "./pages/PaintingsKopien";
import { Biography } from "./pages/biography";
import { Videos } from "./pages/Videos/Videos";

export const menuItemsWithPaths = [
  {
    id: 1,
    name: "Biography",
    path: "/biography",
    element: Biography,
  },
  {
    id: 2,
    name: "Paint",
    children: [
      {
        id: 4,
        name: "Pictures List",
        path: "/pictures-list",
        element: Pictures,
      },
      {
        id: 5,
        name: "Add paint",
        path: "/add-paint",
        element: AddingEditingPaint,
        isEditMode: false,
      },
      {
        id: 6,
        name: "Edit paint",
        path: "/edit-paint",
        element: AddingEditingPaint,
        isEditMode: true,
      },
    ],
  },
  {
    id: 3,
    name: "Kopien",
    children: [
      {
        id: 7,
        name: "Add kopien",
        path: "/add-kopien",
        element: AddingEditingKopien,
        isEditMode: false,
      },
      {
        id: 8,
        name: "Edit kopien",
        path: "/edit-kopien",
        element: AddingEditingKopien,
        isEditMode: true,
      },
    ],
  },
  {
    id: 9,
    name: "Paintings kopien",
    path: "/paintings-kopien",
    element: PaintingsKopien,
  },
  {
    id: 10,
    name: "Videos",
    path: "/videos",
    element: Videos,
  },
];
const App: React.FC = () => {
  return (
    <Router>
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
                element={
                  child.element && (
                    <child.element isEditMode={child.isEditMode || false} />
                  )
                }
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

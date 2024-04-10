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
    visibilty: true,
    name: "Biografie",
    path: "/biography",
    element: Biography,
  },
  {
    id: 2,
    visibilty: true,
    name: "Gemälde" /* картины */,
    children: [
      {
        id: 5,
        visibilty: true,
        name: "Liste der Gemälde" /* список картин */,
        path: "/painting_list",
        element: Pictures,
      },
      {
        id: 6,
        visibilty: true,
        name: "Bild hinzufügen" /* добавить картину */,
        path: "/add_paint",
        element: AddingEditingPaint,
        isEditMode: false,
      },
      {
        id: 7,
        visibilty: false,
        name: "Bild bearbeiten" /* редактировать картину */,
        path: "/edit_paint/:uid",
        element: AddingEditingPaint,
        isEditMode: true,
      },
    ],
  },
  {
    id: 3,
    visibilty: true,
    name: "Kopien",
    children: [
      {
        id: 8,
        visibilty: true,
        name: "Gemälde kopieren" /* список копий */,
        path: "/copy_paintings",
        element: PaintingsKopien,
      },
      {
        id: 9,
        visibilty: true,
        name: "Kopien hinzufügen" /* Добавить копии */,
        path: "/add_copy",
        element: AddingEditingKopien,
        isEditMode: false,
      },
      {
        id: 10,
        visibilty: false,
        name: "Kopien bearbeiten" /* редактирование копий */,
        path: "/edit_copy",
        element: AddingEditingKopien,
        isEditMode: true,
      },
    ],
  },
  {
    id: 4,
    visibilty: true,
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

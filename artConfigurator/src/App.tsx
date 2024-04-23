import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./output.css";
import LogIn from "./pages/Login";
import { AddingEditingKopien } from "./pages/AddingEditingKopien";
import { AddingEditingPaint } from "./pages/Paint";
import { Pictures } from "./pages/Pictures";
import { PaintingsKopien } from "./pages/PaintingsKopien";
import { Biography } from "./pages/Biography";
import { Videos } from "./pages/Videos";
import React from "react";
import { useAuth } from "./context/AuthContext";

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
        id: 10,
        visibilty: false,
        name: "Kopien bearbeiten" /* редактирование копий */,
        path: "/edit_copy/:uid",
        element: AddingEditingKopien,
        isEditMode: true,
      },
      {
        id: 9,
        visibilty: true,
        name: "Kopien hinzufügen" /* Добавить копии */,
        path: "/add_copy",
        element: AddingEditingKopien,
        isEditMode: false,
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
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        {menuItemsWithPaths.map((item) => (
          <Route
            key={item.id}
            path={item.path || ""}
            element={
              isAuthenticated
                ? item.element && (
                    <>
                      <item.element />
                    </>
                  )
                : item.element && <Navigate to="/" replace />
            }
          />
        ))}
        {menuItemsWithPaths.map((item) =>
          item.children
            ? item.children.map((child) => (
                <Route
                  key={child.id}
                  path={child.path}
                  element={
                    isAuthenticated ? (
                      <child.element isEditMode={child.isEditMode || false} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              ))
            : null
        )}
      </Routes>
    </Router>
  );
};

export default App;

import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
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
import { useEffect, useState } from "react";
import React from "react";
import { Head } from "./api/axiosInstance";

export const menuItemsWithPaths = [
  {
    id: 1,
    visibilty: true,
    name: "Biografie",
    path: "/biography",
    element: Biography
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
        element: Pictures
      },
      {
        id: 6,
        visibilty: true,
        name: "Bild hinzufügen" /* добавить картину */,
        path: "/add_paint",
        element: AddingEditingPaint,
        isEditMode: false
      },
      {
        id: 7,
        visibilty: false,
        name: "Bild bearbeiten" /* редактировать картину */,
        path: "/edit_paint/:uid",
        element: AddingEditingPaint,
        isEditMode: true
      }
    ]
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
        element: PaintingsKopien
      },
      {
        id: 9,
        visibilty: true,
        name: "Kopien hinzufügen" /* Добавить копии */,
        path: "/add_copy",
        element: AddingEditingKopien,
        isEditMode: false
      },
      {
        id: 10,
        visibilty: false,
        name: "Kopien bearbeiten" /* редактирование копий */,
        path: "/edit_copy",
        element: AddingEditingKopien,
        isEditMode: true
      }
    ]
  },
  {
    id: 4,
    visibilty: true,
    name: "Videos",
    path: "/videos",
    element: Videos
  }
];

const App: React.FC = () => {
  const [token, setToken] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");

  const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const storedToken = localStorage.getItem("access_token");

    if (storedToken) {
      Head({ Authorization: `Bearer ${storedToken}` }, BURL, "/check_me_out")
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            setToken(true);
          } else {
            localStorage.removeItem("access_token");
            setToken(false);
          }
        })
        .catch(() => {
          localStorage.removeItem("access_token");
          setToken(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

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
              token
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
                    token ? (
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

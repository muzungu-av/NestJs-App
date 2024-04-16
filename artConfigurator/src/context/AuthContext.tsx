import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { Head } from "../api/axiosInstance";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sc = import.meta?.env?.VITE_SCHEME;
  const bu = import.meta.env?.VITE_BACKEND_URL?.replace(/https?:\/\//g, "");

  const BURL = sc && bu ? `${sc}://${bu}` : "http://localhost-default:9000";
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (storedToken: string) => {
    Head({ Authorization: `Bearer ${storedToken}` }, BURL, "/check_me_out")
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("access_token");
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        setIsAuthenticated(false);
      })
      .finally(() => setIsLoading(false));
  };
  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

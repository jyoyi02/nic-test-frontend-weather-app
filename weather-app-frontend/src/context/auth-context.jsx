import { createContext, useContext, useState } from "react";
import { setCookie, setLocalStorage } from "../lib/utils";
import { setInstanceToken } from "../services/api-client";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    token: "",
  });

  const navigate = useNavigate();

  const login = (data) => {
    setUser({ ...data.user, token: data.token });
    setLocalStorage("data", data);
    setInstanceToken(data.token);
  };

  const logout = () => {
    setLocalStorage("data", null);
    setUser({
      id: null,
      name: "",
      email: "",
      token: "",
    });
    setInstanceToken(null);
    navigate("/login", { replace: true });
  };

  const value = {
    isLoggedIn: !!user.token,
    token: user?.token,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

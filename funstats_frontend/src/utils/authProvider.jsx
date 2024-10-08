import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [season, setSeason] = useState(null);
  const login = (userToken, userId) => {
    setToken(userToken);
    setPlayerId(userId);
  };
  const logout = () => {
    setToken(null);
    setPlayerId(null);
  };
  const isAuthenticated = !!token && !!playerId;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, playerId, setSeason, season }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("JWTtoken");
    const storedUserId = sessionStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setPlayerId(storedUserId);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userToken, userId) => {
    setToken(userToken);
    setPlayerId(userId);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setToken(null);
    setPlayerId(null);
    sessionStorage.clear();
    setIsAuthenticated(false);
    setSeason(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        playerId,
        setSelectedSeason,
        selectedSeason,
        token,
      }}
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

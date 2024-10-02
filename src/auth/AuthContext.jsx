import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  );
  const [username, setUserName] = useState(
    localStorage.getItem("username") || null
  );

  const login = (token, role, username) => {
    setAuthToken(token);
    setUserRole(role);
    setUserName(username);

    // Also store login data in local storage
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null);
    setUserName(null);

    // Also store login data in local storage
    localStorage.removeItem("authToken", token);
    localStorage.removeItem("userRole", role);
    localStorage.removeItem("username", username);

  };

  return (
    <AuthContext.Provider
      value={{ authToken, userRole, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useState, useContext, useEffect } from "react"

// Create the context
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  )
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || null
  )
  const [username, setUserName] = useState(
    localStorage.getItem("username") || null
  )

  const [companyId, setCompanyId] = useState(
    localStorage.getItem("companyId") || null
  )

  const [userId, setUserId] = useState(localStorage.getItem("userId") || null)

  const login = (token, role, username, companyId, userId) => {
    setAuthToken(token)
    setUserRole(role)
    setUserName(username)
    setCompanyId(companyId)
    setUserId(userId)

    // Also store login data in local storage
    localStorage.setItem("authToken", token)
    localStorage.setItem("userRole", role)
    localStorage.setItem("username", username)
    localStorage.setItem("companyId", companyId)
    localStorage.setItem("userId", userId)
  }

  const logout = () => {
    setAuthToken(null)
    setUserRole(null)
    setUserName(null)
    setCompanyId(null)
    setUserId(null)

    localStorage.removeItem("authToken")
    localStorage.removeItem("userRole")
    localStorage.removeItem("username")
    localStorage.removeItem("companyId")
    localStorage.removeItem("userId")
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        userRole,
        username,
        companyId,
        userId,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext)
}

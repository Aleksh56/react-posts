import React, { useState } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import MainPage from "./components/MainPage"
import AuthPage from "./components/AuthPage"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState()
  const [localStorageisAuth, setLocalStorageisAuth] = useState(
    window.localStorage.getItem("isAuthenticated")
  )

  const localStorage = window.localStorage

  const handleLogin = (loginData) => {
    setIsAuthenticated(true)
    localStorage.setItem("isAuthenticated", true)
    setUserData(loginData)
    setLocalStorageisAuth(true)
  }

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", false)
    setIsAuthenticated(false)
    setLocalStorageisAuth(false)
  }

  const isLoggedIn = isAuthenticated || JSON.parse(localStorageisAuth)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/main" replace />
            ) : (
              <AuthPage handleUserLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/main"
          element={
            isLoggedIn ? (
              <MainPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App

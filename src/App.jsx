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
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/main" replace />
            ) : (
              <AuthPage handleUserLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/main"
          element={
            isAuthenticated ? (
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

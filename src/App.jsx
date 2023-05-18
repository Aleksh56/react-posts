import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import PostInfo from "./components/PostInfo";
import ErrorPage from "./components/404Error/ErrorPage";
import UserProfile from "./components/UserProfilePage/UserProfile";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [localStorageisAuth, setLocalStorageisAuth] = useState(
    window.localStorage.getItem("isAuthenticated")
  );
  const localStorage = window.localStorage;

  const handleLogin = (loginData) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
    setLocalStorageisAuth(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", false);
    setIsAuthenticated(false);
    setLocalStorageisAuth(false);
  };

  const isLoggedIn = isAuthenticated || JSON.parse(localStorageisAuth);
  // Сделать здесь общий Footer и Header, кроме Auth, чтобы не подключать их в других страницах
  return (
    <Routes>
      <Route
        path='/'
        element={
          isLoggedIn ? (
            <Navigate to='/main' replace />
          ) : (
            <AuthPage handleUserLogin={handleLogin} />
          )
        }
      />
      <Route
        path='/main'
        element={
          isLoggedIn ? (
            <MainPage onLogout={handleLogout} />
          ) : (
            <Navigate to='/' replace />
          )
        }
      />
      <Route
        path='/post/:postId'
        element={
          isLoggedIn ? (
            <PostInfo onLogout={handleLogout} />
          ) : (
            <Navigate to='/' replace />
          )
        }
      />
      <Route
        path='/auth'
        element={
          isLoggedIn ? (
            <Navigate to='/main' replace />
          ) : (
            <AuthPage handleUserLogin={handleLogin} />
          )
        }
      />
      <Route path='/profile/:userId' element={<UserProfile handleUserDataUpdate={handleUserDataUpdate} />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;

import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import PostInfo from "./components/Posts/PostInfo";
import ErrorPage from "./components/404Error/ErrorPage";
import UserProfile from "./components/UserProfilePage/UserProfile";
import { UserDataContext } from "./context/UserContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [localStorageisAuth, setLocalStorageisAuth] = useState(
    window.localStorage.getItem("isAuthenticated")
  );
  const localStorage = window.localStorage;

  const handleLogin = (loginData) => {
    setIsAuthenticated(true);
    localStorage.setItem("userData", JSON.stringify(loginData));
    localStorage.setItem("isAuthenticated", true);
    setLocalStorageisAuth(true);
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", false);
    setIsAuthenticated(false);
    setLocalStorageisAuth(false);
  };
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const handleUserDataUpdate = (newUserData) => {
    setUserData(newUserData);
  };

  const isLoggedIn = isAuthenticated || JSON.parse(localStorageisAuth);
  // Сделать здесь общий Footer и Header, кроме Auth, чтобы не подключать их в других страницах
  return (
    <UserDataContext.Provider value={{ userData, handleUserDataUpdate }}>
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
        <Route path='/profile/:userId' element={<UserProfile />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </UserDataContext.Provider>
  );
};

export default App;

import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import PostInfo from "./components/Posts/PostInfo";
import ErrorPage from "./components/404Error/ErrorPage";
import UserProfile from "./components/UserProfilePage/UserProfile";

const App = () => {
  let isLoggedIn = useSelector((state) => state.profile.isLoggedIn);

  return (
    <Routes>
      <Route
        path='/'
        element={isLoggedIn ? <Navigate to='/main' replace /> : <AuthPage />}
      />
      <Route
        path='/main'
        element={isLoggedIn ? <MainPage /> : <Navigate to='/' replace />}
      />
      <Route
        path='/post/:postId'
        element={isLoggedIn ? <PostInfo /> : <Navigate to='/' replace />}
      />
      <Route
        path='/auth'
        element={isLoggedIn ? <Navigate to='/main' replace /> : <AuthPage />}
      />
      <Route path='/profile/:userId' element={<UserProfile />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;

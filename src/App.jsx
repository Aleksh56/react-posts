import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProfileData } from "./store/actions/ProfileActions";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage";
import AuthPage from "./components/AuthPage";
import PostInfo from "./components/Posts/PostInfo";
import ErrorPage from "./components/404Error/ErrorPage";
import UserProfile from "./components/UserProfilePage/UserProfile";
import { persistor } from "./store/store";
import { PURGE } from "redux-persist";
import { setLoggedIn } from "./store/actions/ProfileActions";

const App = () => {
  const dispatch = useDispatch();
  let isLoggedIn = useSelector((state) => state.profile.isLoggedIn);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    dispatch(removeProfileData());
    dispatch(setLoggedIn(false));
    await persistor.purge();
    persistor.pause();
    persistor.persist();
    persistor.flush();
  };

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
        element={isLoggedIn ? <Navigate to='/main' replace /> : <AuthPage />}
      />
      <Route path='/profile/:userId' element={<UserProfile />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;

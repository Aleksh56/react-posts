import React, { useState, useEffect } from "react"
import { api } from "../api/api"
import { BiExit, BiEditAlt } from "react-icons/bi"
import EditProfile from "./EditProfile"

const Header = ({ handleLogout, refreshPostsOnPage }) => {
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await api.getUserInfo()
      setUserInfo(userData)
      window.localStorage.setItem("userData", JSON.stringify(userData))
    }
    fetchUserData()
  }, [refreshPostsOnPage])

  return (
    <header className="bg-red-400">
      <div className="container mx-auto flex items-center justify-between py-4 w-full">
        <div className="header__logo flex items-center justify-center">
          <img src="#" alt="Main logo" />
          <a href="#">
            <h1 className="ml-3">Реактивные посты</h1>
          </a>
        </div>
        <div className="header__signin flex items-center">
          <div className="header__signin-info flex items-center justify-center">
            <div className="header__user-avatar">
              <img
                src={userInfo.avatar}
                alt="UserAvatar"
                width="50px"
                height="50px"
                className="rounded-full mr-4"
              />
            </div>
            <div className="header__user-about">
              <p>{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
          <EditProfile
            refreshPostsOnPage={refreshPostsOnPage}
            userInfo={userInfo}
          />
          <button
            className="header__logout-btn ml-2 rounded-lg bg-sky-500 py-3 px-3 text-white font-bold"
            onClick={handleLogout}
          >
            <BiExit />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

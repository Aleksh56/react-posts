import React, { useState, useEffect } from "react"
import Logo from "../../assets/logo.png"
import EditProfile from "../EditProfile"
import { api } from "../../api/api"
import { BiExit, BiEditAlt } from "react-icons/bi"
import { Link } from "react-router-dom"

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
    <header className="bg-blue-300 px-4">
      <div className="container mx-auto flex items-center justify-between py-4 w-full max-sm:flex-col max-sm:items-start">
        <div className="header__logo flex items-center justify-center">
          <Link to="/">
            <img
              src={Logo}
              alt="Main logo"
              className="max-w-[60px] max-h-[60px]"
              width="60px"
            />
          </Link>
          <Link to="/">
            <h1 className="ml-3">Реактивные посты</h1>
          </Link>
        </div>
        <div className="header__signin flex items-center">
          <div className="header__signin-info flex items-center justify-center">
            <div className="header__user-avatar ">
              <img
                src={userInfo.avatar}
                alt="UserAvatar"
                className="w-10 h-10 rounded-full mr-4 max-w-[40px] max-h-[40px]"
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

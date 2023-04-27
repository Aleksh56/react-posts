import React from "react"

const Header = ({ handleLogout, userData }) => {
  const { name, avatar, email } = userData
  return (
    <header className="bg-red-400">
      <div className="container mx-auto flex items-center justify-between py-8 w-full">
        <div className="header__logo flex items-center justify-center">
          <img src="#" alt="Main logo" />
          <a href="#">
            <h1 className="ml-3">Реактивные посты</h1>
          </a>
        </div>
        <div className="header__signin flex flex-col items-center">
          <div className="header__signin-info flex items-center justify-center">
            <div className="header__user-avatar">
              <img
                src={avatar}
                alt="UserAvatar"
                width="50px"
                height="50px"
                className="rounded-full mr-4"
              />
            </div>
            <div className="header__user-about">
              <p>{name}</p>
              <p>{email}</p>
            </div>
          </div>
          <button
            className="header__logout-btn mt-2 rounded-lg bg-sky-500 py-2 px-4 text-white font-bold"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

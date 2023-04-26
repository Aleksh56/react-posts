import React from "react"

const Header = () => {
  return (
    <header className="bg-red-400">
      <div className="container mx-auto flex items-center justify-between py-8 w-full">
        <div className="header__logo flex items-center justify-center">
          <img src="#" alt="Main logo" />
          <a href="#">
            <h1 className="ml-3">Реактивные посты</h1>
          </a>
        </div>
        <div className="header__signin">Something</div>
      </div>
    </header>
  )
}

export default Header

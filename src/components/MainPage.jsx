import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Hero from "./Hero"

const MainPage = ({ onLogout }) => {
  return (
    <>
      <Header handleLogout={onLogout} />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}

export default MainPage

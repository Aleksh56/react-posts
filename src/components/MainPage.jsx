import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Hero from "./Hero"

const MainPage = ({ onLogout, userData }) => {
  return (
    <>
      <Header handleLogout={onLogout} userData={userData} />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  )
}

export default MainPage

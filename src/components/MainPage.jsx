import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Hero from "./Hero"
import AllPosts from "./AllPosts"

const MainPage = ({ onLogout }) => {
  return (
    <>
      <Header handleLogout={onLogout} />
      <main>
        <Hero />
        <AllPosts />
      </main>
      <Footer />
    </>
  )
}

export default MainPage

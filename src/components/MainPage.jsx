import React, { useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Hero from "./Hero"
import AllPosts from "./AllPosts"

const MainPage = ({ onLogout }) => {
  const [addPostFlag, setAddPostFlag] = useState(false)

  const refreshPostsOnPage = () => {
    setAddPostFlag(!addPostFlag)
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Header handleLogout={onLogout} refreshPostsOnPage={refreshPostsOnPage} />
      <main className="flex-1">
        <Hero refreshFlagOnPage={refreshPostsOnPage} />
        <AllPosts
          refreshFlag={addPostFlag}
          refreshPostsOnPage={refreshPostsOnPage}
        />
      </main>
      <Footer />
    </div>

  )
}

export default MainPage

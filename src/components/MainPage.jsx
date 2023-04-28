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
    <>
      <Header 
      handleLogout={onLogout} 
      refreshFlagOnPage={refreshPostsOnPage}
      />
      <main>
        <Hero refreshFlagOnPage={refreshPostsOnPage} />
        <AllPosts
          refreshFlag={addPostFlag}
          refreshPostsOnPage={refreshPostsOnPage}
        />
      </main>
      <Footer />
    </>
  )
}

export default MainPage

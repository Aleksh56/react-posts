import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Hero from "./Hero";
import AllPosts from "./Posts/AllPosts";

const MainPage = () => {
  const [addPostFlag, setAddPostFlag] = useState(false);

  const refreshPostsOnPage = () => {
    setAddPostFlag(!addPostFlag);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header refreshPostsOnPage={refreshPostsOnPage} />
      <main className='flex-1 bg-slate-200'>
        <Hero refreshFlagOnPage={refreshPostsOnPage} />
        <AllPosts
          refreshFlag={addPostFlag}
          refreshPostsOnPage={refreshPostsOnPage}
        />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;

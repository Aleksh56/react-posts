import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Hero from "./Hero";
import AllPosts from "./Posts/AllPosts";
import Greeting from "./Greeting/Greeting";

const MainPage = () => {
  const [addPostFlag, setAddPostFlag] = useState(false);

  const refreshPostsOnPage = () => {
    setAddPostFlag(!addPostFlag);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header refreshPostsOnPage={refreshPostsOnPage} />
      <main className='flex-1 max-w-[1300px] mx-auto'>
        <Greeting />
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

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import EditPost from "./EditPost";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { api } from "../api/api";

const PostInfo = ({ onLogout }) => {
  const [postInfo, setPostInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const {
    author = { name: "avtor", avatar: "" },
    comments = [],
    created_at = "",
    image = "",
    likes = [],
    tags = ["11"],
    text = "",
    title = "",
    _id = "",
  } = postInfo;

  useEffect(() => {
    const fetchPostInfo = async () => {
      const postId = window.location.href.split("/").pop();
      setPostInfo(await api.getInfoAboutPostById(postId));
    };
    fetchPostInfo();
  }, []);

  const closeModal = () => setShowModal(false);

  return (
    <>
      {showModal && <EditPost postInfo={postInfo} closeModal={closeModal} />}
      <div className='min-h-screen flex flex-col'>
        <Header handleLogout={onLogout} />
        <div className='flex-1 bg-sky-200 py-8 post__about'>
          <div className='container mx-auto flex flex-col flex-wrap post__info'>
            <Breadcrumb className='mb-3'>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Post-{_id}</Breadcrumb.Item>
            </Breadcrumb>
            <div className='mb-8 back__btn'>
              <Link
                to='/'
                className='px-4 py-2 text-gray-700 hover:text-gray-900'>
                <FaArrowLeft className='inline-block mr-2' />
                Back
              </Link>
            </div>
            <div className='flex py-3 items-start justify-between post__content'>
              <img
                src={image}
                alt='Post'
                className='object-cover max-w-[600px] lg:w-2/3'
              />
              <div className='p-4 lg:w-1/3 w-full'>
                <div className='mb-4 flex items-center'>
                  <img
                    src={author.avatar}
                    alt='Author'
                    className='w-12 h-12 rounded-full mr-4'
                  />
                  <div className='mr-7'>
                    <p className='text-lg font-medium'>{author.name}</p>
                    <p className='text-gray-600'>{`Created on ${created_at.substring(
                      0,
                      10
                    )}`}</p>
                  </div>
                  <Button
                    type='primary'
                    className='bg-sky-400 px-3 py-2 rounded-xl transition-all hover:bg-sky-300'
                    onClick={() => setShowModal(true)}>
                    Edit post
                  </Button>
                </div>
                <div className='mb-4 flex items-center'>
                  <FaHeart className='inline-block mr-2 text-red-500' />
                  <p className='text-gray-600'>{`${likes.length} likes`}</p>
                </div>
                <div className='flex flex-wrap mt-4'>
                  {tags[0].split(" ").map((tag) => (
                    <div
                      key={tag + Math.random(1, 200)}
                      className='bg-sky-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                      style={{ maxWidth: "calc(100% - 1rem)" }}>
                      {`#${tag}`}
                    </div>
                  ))}
                </div>
                <h1 className='text-2xl font-bold mb-4'>{title}</h1>
                <p className='text-gray-700 leading-relaxed'>{text}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PostInfo;

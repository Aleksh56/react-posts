import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Input, Tag, Space } from "antd";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import EditPost from "./EditPost";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { api } from "../../api/api";

const PostInfo = ({ onLogout }) => {
  const [postInfo, setPostInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState("");
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
  const postId = window.location.href.split("/").pop();

  const fetchPostInfo = async () => {
    setPostInfo(await api.getInfoAboutPostById(postId));
  };
  useEffect(() => {
    fetchPostInfo();
  }, []);

  const handleDeleteComment = async (commentId) => {
    await api.removeCommentFromPost(postId, commentId);
    fetchPostInfo();
  };

  const handleSubmitComment = async () => {
    const responce = await api.addCommentToPost(postId, commentText);
    setCommentText("");
    fetchPostInfo();
  };

  const closeModal = () => setShowModal(false);

  const flattenedTags = tags
    .map((tagList) =>
      tagList.split(/[\s,]+/).filter((tag) => tag.trim() !== "")
    )
    .flat();

  return (
    <>
      {showModal && <EditPost postInfo={postInfo} closeModal={closeModal} />}
      <div className='min-h-screen flex flex-col'>
        <Header handleLogout={onLogout} />
        <div className='flex-1 py-8 post__about'>
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
            <div className='flex py-3 flex-col lg:flex-row lg:items-start lg:justify-between post__content'>
              <img
                src={image}
                alt='Post'
                className='object-cover max-w-full lg:max-w-[600px] lg:w-2/3'
              />
              <div className='p-4 lg:w-1/3 w-full'>
                <div className='mb-4 flex items-center flex-col lg:flex-row'>
                  <img
                    src={author.avatar}
                    alt='Author'
                    className='w-12 h-12 rounded-full mr-4 mb-2 lg:mb-0'
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
                    className='bg-sky-400 px-3 py-2 rounded-xl transition-all hover:bg-sky-300 flex justify-center items-center'
                    onClick={() => setShowModal(true)}>
                    Edit post
                  </Button>
                </div>
                <div className='mb-4 flex items-center'>
                  <FaHeart className='inline-block mr-2 text-red-500' />
                  <p className='text-gray-600'>{`${likes.length} likes`}</p>
                </div>
                <div className='flex flex-wrap mt-4'>
                  <Space size={[0, 8]} wrap>
                    {flattenedTags.map((tag, index) => (
                      <Tag key={index} className='inline-block'>
                        #{tag}
                      </Tag>
                    ))}
                  </Space>
                </div>
                <h1 className='text-2xl font-bold mb-4'>{title}</h1>
                <p className='text-gray-700 leading-relaxed'>{text}</p>
                <div className='mt-6'>
                  <Input.TextArea
                    placeholder='Add a comment...'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button
                    className='mt-3'
                    type='primary'
                    onClick={handleSubmitComment}>
                    Submit
                  </Button>
                </div>
                {comments.length > 0 && (
                  <div className='mt-6 p-3 max-h-[400px] overflow-y-auto'>
                    <h2 className='text-xl font-bold mb-4'>
                      {`${comments.length} Comments`}
                    </h2>
                    {comments.map((comment) => (
                      <div
                        key={comment._id}
                        className='bg-sky-100 p-4 rounded-lg mb-4'>
                        <div className='flex items-center mb-2 w-full'>
                          <img
                            src={comment.author.avatar}
                            alt='Author'
                            className='w-8 h-8 rounded-full mr-2'
                          />
                          <p className='font-medium'>{comment.author.name}</p>
                          <p className='text-gray-600 ml-2'>{`Created on ${comment.created_at.substring(
                            0,
                            10
                          )}`}</p>
                          <button
                            className='flex flex-row ml-5 rounded-full bg-sky-400 p-1 items-center'
                            onClick={() => handleDeleteComment(comment._id)}>
                            <DeleteOutlined />
                          </button>
                        </div>
                        <p className='text-gray-700'>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                )}
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

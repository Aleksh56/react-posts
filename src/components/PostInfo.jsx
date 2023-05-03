import React, { useState, useEffect } from "react"
import Header from "./Header"
import { Link } from "react-router-dom"
import { FaArrowLeft, FaHeart } from "react-icons/fa"
import { TiUser } from "react-icons/ti"
import { api } from "../api/api"
import Footer from "./Footer"
import EditPost from "./EditPost"

const PostInfo = ({ onLogout }) => {
  const [postInfo, setPostInfo] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // setIsLoading(true)
    const handlePostInfoById = async () => {
      const browserUrl = window.location.href
      const postId = browserUrl.split("/").pop()
      const fetchedPostInfo = await api.getInfoAboutPostById(postId)
      console.log(postId)
      setPostInfo(fetchedPostInfo)
    }
    handlePostInfoById()
  }, [])

  const closeModal = (flag) => {
    setShowModal(flag)
  }

  // Без дефолтных данных выбивает ошибку - пофиксить

  const {
    author = "avtor",
    comments = [],
    created_at = "",
    image = "",
    likes = [],
    tags = ["11"],
    text = "",
    title = "",
  } = postInfo

  return (
    <>
      {showModal && <EditPost postInfo={postInfo} closeModal={closeModal} />}
      <div className="flex flex-col min-h-screen">
        <Header handleLogout={onLogout} />
        <div className=" flex-1  post__about py-8  bg-sky-200">
          <div className="post__info container mx-auto flex flex-wrap flex-col">
            <div className="back__btn mb-8">
              <Link
                to="/"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                <FaArrowLeft className="inline-block mr-2" />
                Back
              </Link>
            </div>
            <div className="post__content flex items-start justify-between py-3">
              <img
                src={image}
                alt="Post"
                className="max-w-[600px] lg:w-2/3 object-cover"
              />
              <div className="w-full lg:w-1/3 p-4">
                <div className="flex items-center mb-4">
                  <img
                    src={author.avatar}
                    alt="Author"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="mr-7">
                    <p className="text-lg font-medium">{author.name}</p>
                    <p className="text-gray-600">{`Created on ${created_at.substring(
                      0,
                      10
                    )}`}</p>
                  </div>
                  <button
                    className="bg-sky-400 px-3 py-2 rounded-xl transition-all hover:bg-sky-300"
                    onClick={() => setShowModal(true)}
                  >
                    Edit post
                  </button>
                </div>

                <div className="flex items-center mb-4">
                  <FaHeart className="inline-block mr-2 text-red-500" />
                  <p className="text-gray-600">{`${likes.length} likes`}</p>
                </div>

                <div className="flex flex-wrap mt-4">
                  {tags[0].split(" ").map((tag) => (
                    <div
                      key={tag}
                      className="bg-sky-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                      style={{ maxWidth: "calc(100% - 1rem)" }}
                    >
                      {`#${tag}`}
                    </div>
                  ))}
                </div>

                <h1 className="text-2xl font-bold mb-4">{title}</h1>

                <p className="text-gray-700 leading-relaxed">{text}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PostInfo

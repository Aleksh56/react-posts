import { useState, useEffect } from "react"
import { FaHeart, FaTrash } from "react-icons/fa"
import { api } from "../api/api"

const Post = ({ postInfo, refreshPosts }) => {
  const [isLiked, setIsLiked] = useState(false)
  const { author, comments, created_at, image, likes, tags, text, title } =
    postInfo

  useEffect(() => {
    const fetchData = async () => {
      const localStorageLikes = localStorage.getItem(postInfo._id)
      if (localStorageLikes) {
        setIsLiked(localStorageLikes.includes(author._id))
      } else {
        try {
          const response = await api.getInfoAboutPostById(postInfo._id)
          setIsLiked(response.likes.includes(author._id))
          localStorage.setItem(postInfo._id, JSON.stringify(response.likes))
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchData()
  }, [postInfo._id, author._id])

  const handleLikeClick = async (event) => {
    event.stopPropagation()
    event.preventDefault()

    const newIsLiked = !isLiked

    try {
      if (newIsLiked) {
        await api.likePostRequest(postInfo)
      } else {
        await api.removeLikeRequest(postInfo)
      }

      const updatedPostInfo = await api.getInfoAboutPostById(postInfo._id)
      setIsLiked(newIsLiked)
      postInfo.likes = updatedPostInfo.likes
      localStorage.setItem(postInfo._id, JSON.stringify(updatedPostInfo.likes))
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    try {
      await api.deletePost(postInfo._id)
      refreshPosts()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-sky-500 overflow-hidden h-full cursor-pointer relative focus:outline-none">
      {/* Post author */}
      <div className="px-6 py-4">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={author.avatar}
            alt="Author avatar"
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{author.name}</p>
            <p className="text-gray-600">{`Posted on: ${created_at.substring(
              0,
              10
            )}`}</p>
          </div>
        </div>
      </div>

      <img
        className="w-full h-64 object-cover md:h-48 lg:h-64"
        src={image}
        alt="Post image"
      />

      <div className="px-6 py-4 flex flex-col h-full justify-between">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{text}</p>
        <div className="flex flex-wrap mt-4">
          {tags[0] &&
            tags[0].split(" ").map((tag, index) => (
              <div
                key={index}
                className="bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                style={{ maxWidth: "calc(100% - 1rem)" }}
              >
                {`#${tag}`}
              </div>
            ))}
        </div>

        <div className=" justify-end flex items-center">
          <button onClick={handleDeleteClick}>
            <FaTrash className="mr-4 text-lg text-gray-500 focus:outline-none hover:text-yellow-500" />
          </button>
          <button onClick={handleLikeClick}>
            <FaHeart
              className={`mr-2 text-lg ${
                isLiked ? "text-red-500" : "text-gray-500"
              } focus:outline-none`}
            />
          </button>
          <span className="text-gray-700 text-sm">{likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Post

import { useState } from "react"
import { FaHeart, FaTrash } from "react-icons/fa"
import { api } from "../api/api"

const Post = ({ postInfo, refreshPosts }) => {
  const [isLiked, setIsLiked] = useState(false)
  const { author, comments, created_at, image, likes, tags, text, title } =
    postInfo

  const handleLikeClick = async (event) => {
    console.log(event)
    setIsLiked(!isLiked)
    !isLiked ? likes.push("like)") : likes.pop()
    // Todo - оптравить изменения в API
    try {
      await api.updatePostInfo(postInfo)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteClick = async () => {
    try {
      await api.deletePost(postInfo._id)
      refreshPosts()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-sky-500 overflow-hidden cursor-pointer relative focus:outline-none">
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

      <img className="w-full h-64 object-cover" src={image} alt="Post image" />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{text}</p>
        <div className="flex flex-wrap mt-4">
          {tags[0].split(" ").map((tag) => (
            <div
              key={tag}
              className="bg-sky-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              style={{ maxWidth: "calc(100% - 1rem)" }}
            >
              {`#${tag}`}
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 right-0 flex items-center mr-4 mb-4">
          <button onClick={handleDeleteClick}>
            <FaTrash className="mr-4 text-lg text-gray-500 focus:outline-none" />
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

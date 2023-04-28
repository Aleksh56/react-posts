import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { api } from "../api/api"
import Post from "./Post"
import { FaSpinner } from "react-icons/fa"

const AllPosts = ({ refreshFlag, refreshPostsOnPage }) => {
  const [posts, setPosts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const fetchAllPostFromApi = async () => {
      const post = await api.getAllPosts()
      setPosts(post)
      setIsLoading(false)
    }
    fetchAllPostFromApi()
  }, [refreshFlag])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    )
  }

  const postItems = posts
    ? posts.map((post) => (
        <Link to={`/post/${post._id}`} key={post._ids}>
          <Post
            key={post._id}
            postInfo={post}
            refreshPosts={refreshPostsOnPage}
          />
        </Link>
      ))
    : null

  return (
    <div className="container py-8 auto-rows-auto mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {postItems}
    </div>
  )
}

export default AllPosts

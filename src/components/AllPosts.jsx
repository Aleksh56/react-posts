import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaSpinner } from "react-icons/fa"
import { api } from "../api/api"
import Post from "./Post"
import styles from "../styles"

const AllPosts = ({ refreshFlag, refreshPostsOnPage }) => {
  const [posts, setPosts] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(12)

  useEffect(() => {
    const fetchAllPostFromApi = async () => {
      try {
        setIsLoading(true)
        const posts = await api.getAllPosts()
        setPosts(posts)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAllPostFromApi()
  }, [refreshFlag])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  if (isLoading) {
    return (
      <div className={`${styles.flexRowFullCenter} h-screen`}>
        <FaSpinner className={styles.fetchLoader} />
      </div>
    )
  }

  return (
    <div className="px-4">
      <div className={styles.postsGridContainer}>
        {currentPosts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <Post
              key={post._id}
              postInfo={post}
              refreshPosts={refreshPostsOnPage}
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(posts.length / postsPerPage) },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            className={`mx-1 my-5 px-3 py-2 rounded-lg ${
              currentPage === pageNumber
                ? "bg-sky-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            } hover:bg-gray-200 focus:outline-none`}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AllPosts

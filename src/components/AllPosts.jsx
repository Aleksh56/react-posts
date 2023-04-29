import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaSpinner } from "react-icons/fa"
import { api } from "../api/api"
import Post from "./Post"
import styles from "../styles"

const AllPosts = ({ refreshFlag, refreshPostsOnPage }) => {
  const [posts, setPosts] = useState()
  const [isLoading, setIsLoading] = useState(true)

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

  if (isLoading) {
    return (
      <div className={`${styles.flexRowFullCenter} h-screen`}>
        <FaSpinner className={styles.fetchLoader} />
      </div>
    )
  }

  return (
    <div className="bg-slate-200">
      <div className={styles.postsGridContainer}>
        {posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <Post
              key={post._id}
              postInfo={post}
              refreshPosts={refreshPostsOnPage}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllPosts

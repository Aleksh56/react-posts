import React, { useState, useEffect } from "react"
import { api } from "../api/api"

const AllPosts = () => {
  const [posts, setPosts] = useState({})

  useEffect(() => {
    const fetchAllPostFromApi = async () => {
      const post = await api.getAllPosts()
      setPosts(post)
    }

    fetchAllPostFromApi()
  }, [])
  // Тут нужно написать скелет поста и через posts.map() => <Post.jsx /> сгенерировать все посты
  return <div>posts</div>
}

export default AllPosts

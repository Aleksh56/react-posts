import { useState, useEffect } from "react"
import { FaHeart, FaTrash } from "react-icons/fa"
import { api } from "../api/api"
import { Card, Avatar, Tag, Button, Space } from "antd"
import { HeartOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons"
import { space } from "postcss/lib/list"

const { Meta } = Card

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

  const flattenedTags = tags
    .map((tagList) => {
      const tags = tagList.split(/[\s,]+/)
      return tags.filter((tag) => tag.trim() !== "")
    })
    .flat()

  return (
    <Card
      hoverable
      cover={<img alt="Post image" src={image} />}
      actions={[
        <Button key="delete" onClick={handleDeleteClick} icon={<DeleteOutlined />}>
          Delete
        </Button>
        ,
        <Button
          key="like"
          onClick={handleLikeClick}
          icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
        >
          {likes.length}
        </Button>
        ,
      ]}>
      <Meta
        avatar={<Avatar src={author.avatar} />}
        title={<span>{author.name}</span>}
        description={`Posted on: ${created_at.substring(0, 10)}`}
      />
      <div className="mt-4 w-full">
        <Space size={[0, 8]} wrap>
          {flattenedTags.map((tag, index) => (
            <Tag key={index} className="inline-block">
              #{tag}
            </Tag>
          ))}
        </Space>
      </div>
      <div className="mt-4">{text}</div>
    </Card>
  )
}

export default Post

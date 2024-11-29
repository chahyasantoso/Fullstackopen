import { useRef, useState } from "react"
import Toggleable from "./Toggleable"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const detailRef = useRef()
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleToggle = () => {
    setVisible(!visible)
    detailRef.current.toggle()
  }

  const handleLike = async () => {
    try {
      const updatedLikes = likes + 1
      await blogService.update({ ...blog, likes: updatedLikes })
      setLikes(updatedLikes)  
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='item'>
      {blog.title} {blog.author} 
      <button onClick={handleToggle}>{visible ? 'Hide' : 'View'}</button>
      <Toggleable ref={detailRef}>
        <div>{blog.url}</div>
        <div>Likes {likes} <button onClick={handleLike}>Like</button></div>
        <div>{blog.user.name}</div>
      </Toggleable>
    </div>  
)}

export default Blog
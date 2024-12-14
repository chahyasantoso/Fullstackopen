import { useRef, useState } from 'react'
import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, onLike, onDelete }) => {
  const detailRef = useRef()
  const [visible, setVisible] = useState(false)

  const handleToggle = () => {
    setVisible(!visible)
    detailRef.current.toggle()
  }

  const handleLike = async () => {
    const blogWithUpdatedLike = { ...blog, likes: blog.likes + 1 }
    onLike(blogWithUpdatedLike)
  }

  const handleDelete = async () => {
    const confirmOK = confirm(`Remove ${blog.title} ${blog.author}`)
    if (confirmOK) {
      onDelete(blog)
    }
  }

  return (
    <div className='item'>
      {blog.title} {blog.author}
      <button onClick={handleToggle}>{visible ? 'Hide' : 'View'}</button>
      <Toggleable ref={detailRef}>
        <div className='url'>{blog.url}</div>
        <div className='likes'>Likes {blog.likes} <button onClick={handleLike}>Like</button></div>
        <div>{blog.user.name}</div>

        <div>
          {user.id === blog.user.id
            ? <button className='btn-blue' onClick={handleDelete}>Remove</button>
            : null
          }
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog
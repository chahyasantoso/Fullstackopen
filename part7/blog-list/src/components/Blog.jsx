import { useRef, useState } from 'react'
import Toggleable from './Toggleable'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const detailRef = useRef()
  const [visible, setVisible] = useState(false)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleToggle = () => {
    setVisible(!visible)
    detailRef.current.toggle()
  }

  const handleLike = async (blog) => {
    try {
      const blogAfterLike = await dispatch(likeBlog(blog))
    } catch (error) {
      dispatch(
        setNotification({
          text: error.response?.data?.error,
          type: 'error',
        })
      )
    }
  }

  const handleDelete = async (blog) => {
    try {
      const confirmOK = confirm(`Remove ${blog.title} ${blog.author}`)
      if (confirmOK) {
        const deletedBlog = await dispatch(deleteBlog(blog))
      }
    } catch (error) {
      dispatch(
        setNotification({
          text: error.response?.data?.error,
          type: 'error',
        })
      )
    }
  }

  return (
    <div className="item">
      {blog.title} {blog.author}
      <button onClick={handleToggle}>{visible ? 'Hide' : 'View'}</button>
      <Toggleable ref={detailRef}>
        <div className="url">{blog.url}</div>
        <div className="likes">
          Likes {blog.likes}{' '}
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>{blog.user.name}</div>

        <div>
          {user.id === blog.user.id ? (
            <button className="btn-blue" onClick={() => handleDelete(blog)}>
              Remove
            </button>
          ) : null}
        </div>
      </Toggleable>
    </div>
  )
}

export default Blog

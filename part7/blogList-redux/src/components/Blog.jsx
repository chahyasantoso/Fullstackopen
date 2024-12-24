import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentList from './CommentList'

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.userSession)
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    try {
      dispatch(likeBlog(blog))
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
        dispatch(deleteBlog(blog))
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

  if (!blog) {
    return <h2>blog doesn't exist</h2>
  }

  const btnRemove =
    user.id === blog.user.id ? (
      <button className="btn-blue" onClick={() => handleDelete(blog)}>
        Remove
      </button>
    ) : null

  return (
    <div className="item">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url} className="url">
        {blog.url}
      </a>
      <div className="likes">
        {blog.likes} likes
        <button onClick={() => handleLike(blog)}>Like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {/* <div>{btnRemove}</div> */}
      <CommentList blog={blog} />
    </div>
  )
}

export default Blog

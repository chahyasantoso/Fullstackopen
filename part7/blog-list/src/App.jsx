import { useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { logout } from './reducers/userReducer'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => {
    const sortedBlogs = [...state.blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button
          onClick={() => {
            dispatch(logout())
          }}
        >
          Logout
        </button>
      </div>
      <Toggleable showLabel="New Blog" hideLabel="Cancel">
        <CreateForm />
      </Toggleable>
      <h2>Blog list</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App

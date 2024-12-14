import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

const App = () => {
  const STORAGE_USER_KEY = 'user'
  const [user, setUser] = useState(() => JSON.parse(
    localStorage.getItem(STORAGE_USER_KEY)
  ))
  const [blogs, setBlogs] = useState([])
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const [notification, setNotification] = useState(null)
  const showNotification = (text, type = 'success', duration = 5000) => {
    setNotification({ text, type })
    setTimeout(() => {
      setNotification(null)
    }, duration)
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])


  const login = async (username, password) => {
    try {
      const userFromLogin = await loginService.login(username, password)
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userFromLogin))
      setUser(userFromLogin)
    } catch (error) {
      showNotification('wrong username or password', 'error')
    }
  }

  const logout = async () => {
    localStorage.clear()
    setUser(null)
  }

  const createFormRef = useRef()
  const createNewBlog = async (blog) => {
    try {
      const newBlog = await blogService.createBlog(blog, user.token)
      const blogsAfterCreate = [...blogs, newBlog]
      setBlogs(blogsAfterCreate)
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
      //hide form
      createFormRef.current.toggle()
    } catch (error) {
      showNotification(error.response?.data?.error, 'error')
    }
  }

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, blog)
      const blogsAfterUpdate = blogs.map(blogObject =>
        (blogObject.id === updatedBlog.id) ? updatedBlog : blogObject
      )
      setBlogs(blogsAfterUpdate)
    } catch (error) {
      showNotification(error.response?.data?.error, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      const deletedBlog = await blogService.deleteBlog(blog.id, user.token)
      const blogsAfterDelete = blogs.filter(blogObject => blogObject.id !== deletedBlog.id)
      setBlogs(blogsAfterDelete)
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <LoginForm onSubmit={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        {user.name} logged in
        <button onClick={logout}>Logout</button>
      </div>
      <Toggleable ref={createFormRef} showLabel='New Blog' hideLabel='Cancel'>
        <CreateForm onSubmit={createNewBlog} />
      </Toggleable>
      <h2>Blog list</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} onLike={likeBlog} onDelete={deleteBlog} />
      )}
    </div>
  )
}


export default App
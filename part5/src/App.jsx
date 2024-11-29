import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Toggleable from './components/Toggleable'

const App = () => {
  const STORAGE_USER_KEY = 'user'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const userFromStorage = localStorage.getItem(STORAGE_USER_KEY)
    if (userFromStorage) {
      return JSON.parse(userFromStorage)
    }
    return null
  })

  const [blogs, setBlogs] = useState([])

  const [notification, setNotification] = useState(null)
  const showNotification = (text, type = 'success', duration = 5000) => {
    setNotification({text, type})
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

  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const resetLoginForm = () => {
    setUsername('')
    setPassword('')
  }
  const login = async e => {
    e.preventDefault()
    try {
      const userFromLogin = await loginService.login(username, password)
      localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userFromLogin))
      setUser(userFromLogin)
      resetLoginForm()
    } catch (error) {
      showNotification('wrong username or password', 'error')
    } 
  }

  const logout = async () => {
    localStorage.clear()
    setUser(null)
  }

  const createFormRef = useRef()
  const create = async (blog) => {
    try {
      const newBlog = await blogService.create(blog, user.token)
      setBlogs([...blogs, newBlog])
      showNotification(`a new blog ${newBlog.title} by ${newBlog.author}`)
      //hide form
      createFormRef.current.toggle()

    } catch (error) {
      console.log(error)
      showNotification(error.response.data.error, 'error')
    }
  }

  //update like should be here, soalnya nanti blog harus di sort
 

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <form onSubmit={login}>
          <div>
            Username <input type='text' value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            Password <input type='text' value={password} onChange={handlePasswordChange} />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        { user.name } logged in 
        <button onClick={logout}>Logout</button>
      </div>
      <Toggleable ref={createFormRef} showLabel='New Blog' hideLabel='Cancel'>
        <CreateForm onSubmit={create} />
      </Toggleable>
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App
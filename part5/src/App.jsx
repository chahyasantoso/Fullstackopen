import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message}) => {
  return message 
  ? (
    <div>
      <h2 className={message.type}>{message.text}</h2>
    </div>
  )
  : null
}

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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleTitleChange = e => setTitle(e.target.value)
  const handleAuthorChange = e => setAuthor(e.target.value)
  const handleUrlChange = e => setUrl(e.target.value)
  const resetCreateForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  const create = async e => {
    e.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url}, user.token)
      setBlogs([...blogs, newBlog])
      resetCreateForm()
      showNotification(`a new blog ${title} by ${author}`)
    } catch (error) {
      console.log(error.response.data.error)
      showNotification(error.response.data.error, 'error')
    }
  }


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
      <div>
        <h2>Create new</h2>
        <form onSubmit={create}>
          <div>
            Title : <input type='text' value={title} onChange={handleTitleChange} />
          </div>
          <div>
            Author : <input type='text' value={author} onChange={handleAuthorChange} />
          </div>
          <div>
            URL : <input type='text' value={url} onChange={handleUrlChange} />
          </div>
          <div>
            <button type='submit'>Create</button>
          </div>
        </form>
      </div>
      <h2>Blog list</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
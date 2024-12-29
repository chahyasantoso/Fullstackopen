import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Menu from './components/Menu'

import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const userSession = useSelector((state) => state.userSession)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const blogs = useSelector((state) => {
    const sortedBlogs = [...state.blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  })

  useEffect(() => {
    if (userSession) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [userSession])

  const userIdMatch = useMatch('/users/:id')
  const userById = (id) => users.find((user) => user.id === id)
  const user = userIdMatch ? userById(userIdMatch.params.id) : null

  const blogIdMatch = useMatch('/blogs/:id')
  const blogsById = (id) => blogs.find((blog) => blog.id === id)
  const blog = blogIdMatch ? blogsById(blogIdMatch.params.id) : null

  const routes = [
    { path: '/', element: <BlogList blogs={blogs} /> },
    { path: '/blogs/:id', element: <Blog blog={blog} /> },
    { path: '/users', element: <UserList users={users} /> },
    { path: '/users/:id', element: <User user={user} /> },
  ]

  if (!userSession) {
    return <Login />
  }

  return (
    <div>
      <Menu />
      <div className="container">
        <h2 className="mt-3 mb-3">BlogApp</h2>
        <Notification />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </div>
    </div>
  )
}

export default App

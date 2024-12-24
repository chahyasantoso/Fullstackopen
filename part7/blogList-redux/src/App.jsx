import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, useMatch, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import Login from './components/Login'
import Menu from './components/Menu'

const App = () => {
  const userSession = useSelector((state) => state.userSession)
  const blogs = useSelector((state) => {
    const sortedBlogs = [...state.blogs].sort((a, b) => b.likes - a.likes)
    return sortedBlogs
  })

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log('running useEffect', userSession)
    if (userSession) {
      // console.log('running initialize')
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
    { path: '/users', element: <UserList users={users} /> },
    { path: '/users/:id', element: <User user={user} /> },
    { path: '/blogs/:id', element: <Blog blog={blog} /> },
  ]

  if (!userSession) {
    return <Login />
  }

  return (
    <div>
      <Menu />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </div>
  )
}

export default App

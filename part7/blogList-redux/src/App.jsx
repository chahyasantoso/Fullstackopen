import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Menu from './components/Menu'

import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { createSelector } from '@reduxjs/toolkit'

const blogsSelector = createSelector(
  (state) => state.blogs, //input; akan memonitor state ini, jika berubah
  (blogs) => [...blogs].sort((a, b) => b.likes - a.likes) //output; maka output akan dijalankan
)

const App = () => {
  const userSession = useSelector((state) => state.userSession)
  const blogs = useSelector(blogsSelector)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userSession) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [userSession])

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
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<UserList users={users} />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

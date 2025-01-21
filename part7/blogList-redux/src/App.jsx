import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Menu from './components/Menu'

import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useBlogDispatch } from './hooks/useBlogs'
import { useUserDispatch } from './hooks/useUsers'
import { useAuth } from './hooks/useAuth'
import useAxiosInterceptor from './hooks/useAxiosInterceptor'

const App = () => {
  useAxiosInterceptor()
  const userSession = useAuth()
  const { initialize: initBlogs } = useBlogDispatch()
  const { initialize: initUsers } = useUserDispatch()

  useEffect(() => {
    if (userSession) {
      initBlogs()
      initUsers()
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
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Menu from './components/Menu'

import { Routes, Route } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import useInterceptor from './hooks/useInterceptor'
import useNotification from './hooks/useNotification'

const App = () => {
  const { userSession, isInitialized, logout } = useAuth()
  const { setNotificationTimeout } = useNotification()

  const handleExpireToken = (error) => {
    const text = error.response?.data?.error ?? error.message
    if (text.includes('token expired')) {
      setNotificationTimeout({ text, type: 'danger' })
      logout()
    }
    return Promise.reject(error)
  }
  useInterceptor(handleExpireToken)

  if (!isInitialized) {
    return null
  }

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

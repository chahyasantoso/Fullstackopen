import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import useAxiosInterceptor from './hooks/useAxiosInterceptor'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Menu from './components/Menu'
import BlogPlaceholder, { ListPlaceholder } from './components/BlogPlaceholder'
import useNotification from './hooks/useNotification'

const App = () => {
  useAxiosInterceptor()
  const { userSession, isSuccess, isError, loadUserSession } = useAuth()
  const loadStatus = { isSuccess, isError }
  const { setNotificationTimeout } = useNotification()

  useEffect(() => {
    const handleLoad = async () => {
      try {
        await loadUserSession()
      } catch (error) {
        console.error(error)
        setNotificationTimeout({ type: 'danger', text: error.message })
      }
    }
    handleLoad()
  }, [])

  const isLoggedOut = isSuccess && !userSession
  if (isLoggedOut) {
    return <Login />
  }

  return (
    <div>
      <Menu />
      <div className="container">
        <h2 className="mt-3 mb-3">BlogApp</h2>
        <Notification />
        <BlogPlaceholder placeholder={<ListPlaceholder />} {...loadStatus}>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </BlogPlaceholder>
      </div>
    </div>
  )
}

export default App

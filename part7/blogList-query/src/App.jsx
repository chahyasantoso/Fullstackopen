import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import useAxiosInterceptor from './hooks/useAxiosInterceptor'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Login from './components/Login'
import Menu from './components/Menu'
import Shimmer, { ListShimmer } from './components/Shimmer'
import { useError } from './hooks/useError'

const App = () => {
  useAxiosInterceptor()
  const { userSession, isSuccess, isError, loadUserSession } = useAuth()
  const { handleError } = useError()

  useEffect(() => {
    const handleLoad = async () => {
      try {
        await loadUserSession()
      } catch (error) {
        handleError(error, "can't load session, please re-login")
      }
    }
    handleLoad()
  }, [])

  const isLoaded = isSuccess || isError
  const isLoggedIn = isLoaded && !!userSession
  const isLoggedOut = isLoaded && !userSession
  if (isLoggedOut) {
    return <Login />
  }

  return (
    <div>
      <Menu />
      <div className="container">
        <h2 className="mt-3 mb-3">BlogApp</h2>
        <Notification />
        <Shimmer as={<ListShimmer />} isSuccess={isLoggedIn}>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shimmer>
      </div>
    </div>
  )
}

export default App

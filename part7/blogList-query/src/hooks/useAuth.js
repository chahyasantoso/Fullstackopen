import { useContext, useState } from 'react'
import UserSessionContext, {
  setUserSession,
  clearUserSession,
} from '../contexts/UserSessionContext'
import userSessionService from '../services/userSession'
import loginService from '../services/login'

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null)
  const isError = error !== null
  const [userSession, dispatch] = useContext(UserSessionContext)

  const withStatus = (asyncFn) => {
    return async (...args) => {
      setIsLoading(true)
      setIsSuccess(false)
      setError(null)
      try {
        await new Promise((r) => setTimeout(r, 2000))
        await asyncFn(...args)
        setIsSuccess(true)
      } catch (error) {
        setError(error)
        setIsSuccess(false)
        throw error
      } finally {
        setIsLoading(false)
      }
    }
  }

  const loadUserSession = withStatus(async () => {
    const userSession = userSessionService.getSession()
    if (userSession) {
      dispatch(setUserSession(userSession))
    }
  })

  const login = withStatus(async (username, password) => {
    const userFromLogin = await loginService.login(username, password)
    userSessionService.setSession(userFromLogin)
    dispatch(setUserSession(userFromLogin))
  })

  const logout = withStatus(async () => {
    userSessionService.clearSession()
    dispatch(clearUserSession())
  })

  return {
    userSession,
    isLoading,
    isSuccess,
    isError,
    error,
    loadUserSession,
    login,
    logout,
  }
}

export default useAuth

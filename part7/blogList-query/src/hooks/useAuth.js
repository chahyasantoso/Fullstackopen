import { useContext, useEffect, useState } from 'react'
import UserSessionContext, {
  setUserSession,
  clearUserSession,
} from '../contexts/UserSessionContext'
import userSessionService from '../services/userSession'
import loginService from '../services/login'

const useAuth = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [userSession, dispatch] = useContext(UserSessionContext)

  useEffect(() => {
    if (!isInitialized) {
      dispatch(setUserSession(userSessionService.getSession()))
      setIsInitialized(true)
    }
  }, [isInitialized])

  const login = async (username, password) => {
    const userFromLogin = await loginService.login(username, password)
    userSessionService.setSession(userFromLogin)
    dispatch(setUserSession(userFromLogin))
  }

  const logout = () => {
    userSessionService.clearSession()
    dispatch(clearUserSession())
  }

  return {
    userSession,
    isInitialized,
    login,
    logout,
  }
}

export default useAuth

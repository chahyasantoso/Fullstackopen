import { useContext, useEffect, useState } from 'react'
import UserSessionContext, {
  setUserSession,
  clearUserSession,
} from '../contexts/UserSessionContext'
import userSessionService from '../services/userSession'
import loginService from '../services/login'

export const useAuth = () => {
  return useContext(UserSessionContext)[0]
}

export const useAuthDispatch = () => {
  const dispatch = useContext(UserSessionContext)[1]
  const [status, setStatus] = useState('idle')
  const isPending = status === 'pending'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  const withStatus = (asyncFn) => {
    return async (...args) => {
      setStatus('pending')
      try {
        //await new Promise((r) => setTimeout(r, 2000))
        await asyncFn(...args)
        setStatus('success')
      } catch (error) {
        setStatus('error')
        throw error
      }
    }
  }

  const loadUserSession = withStatus(async () => {
    try {
      const userFromSession = userSessionService.getSession()
      if (userFromSession) {
        dispatch(setUserSession(userFromSession))
      }
    } catch (error) {
      dispatch(clearUserSession())
    }
  })

  const login = withStatus(async (username, password) => {
    const userFromLogin = await loginService.login(username, password)
    dispatch(setUserSession(userFromLogin))
    userSessionService.setSession(userFromLogin)
  })

  const logout = withStatus(async () => {
    dispatch(clearUserSession())
    userSessionService.clearSession()
  })

  return {
    status,
    isPending,
    isSuccess,
    isError,
    loadUserSession,
    login,
    logout,
  }
}

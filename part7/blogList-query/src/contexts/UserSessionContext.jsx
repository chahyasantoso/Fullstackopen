import { useReducer } from 'react'
import { createContext } from 'react'
import userSessionService from '../services/userSession'
import loginService from '../services/login'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_SESSION':
      const userSession = action.payload
      return userSession
    case 'CLEAR_USER_SESSION':
      return null
    default:
      return state
  }
}

const setUserSession = (userSession) => ({
  type: 'SET_USER_SESSION',
  payload: userSession,
})

const clearUserSession = () => ({
  type: 'CLEAR_USER_SESSION',
})

const UserSessionContext = createContext()

export const UserSessionContextProvider = ({ children }) => {
  const initialState = userSessionService.getSession()
  const [userSession, dispatch] = useReducer(reducer, initialState)

  const login = async (username, password) => {
    const userFromLogin = await loginService.login(username, password)
    userSessionService.setSession(userFromLogin)
    dispatch(setUserSession(userFromLogin))
  }

  const logout = () => {
    userSessionService.clearSession()
    dispatch(clearUserSession())
  }

  return (
    <UserSessionContext.Provider value={{ userSession, login, logout }}>
      {children}
    </UserSessionContext.Provider>
  )
}

export default UserSessionContext

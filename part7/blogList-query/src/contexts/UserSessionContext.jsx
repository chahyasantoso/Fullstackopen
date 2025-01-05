import { useReducer } from 'react'
import { createContext } from 'react'

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

export const setUserSession = (userSession) => ({
  type: 'SET_USER_SESSION',
  payload: userSession,
})

export const clearUserSession = () => ({
  type: 'CLEAR_USER_SESSION',
})

const UserSessionContext = createContext()

export const UserSessionContextProvider = ({ children }) => {
  const [userSession, dispatch] = useReducer(reducer, null)

  return (
    <UserSessionContext.Provider value={[userSession, dispatch]}>
      {children}
    </UserSessionContext.Provider>
  )
}

export default UserSessionContext

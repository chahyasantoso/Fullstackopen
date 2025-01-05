import { useReducer } from 'react'
import { createContext } from 'react'

const initialState = {
  text: '',
  type: 'success',
  timeoutId: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { text, type = initialState.type } = action.payload
      return { text, type }
    case 'RESET_NOTIFICATION':
      return initialState
    case 'SET_TIMEOUT_ID':
      const timeoutId = action.payload
      return { ...state, timeoutId }
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return { type: 'SET_NOTIFICATION', payload: notification }
}

export const resetNotification = () => {
  return { type: 'RESET_NOTIFICATION' }
}

export const setTimeoutId = (timeoutId) => {
  return { type: 'SET_TIMEOUT_ID', payload: timeoutId }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

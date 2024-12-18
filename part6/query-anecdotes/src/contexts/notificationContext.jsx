import { createContext, useReducer } from "react"

const initialNotification = ''
const notificationReducer = (state = initialNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'RESET_NOTIFICATION':
      return initialNotification
    default:
      return state
  }
}

export const setNotification = (payload) => ({ type: 'SET_NOTIFICATION', payload })
export const resetNotification = () => ({ type: 'RESET_NOTIFICATION' })

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext




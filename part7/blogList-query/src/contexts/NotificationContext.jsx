import { useReducer } from 'react'
import { createContext } from 'react'

const initialState = {
  text: '',
  type: 'success',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { text, type = initialState.type } = action.payload
      return { text, type }
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, initialState)

  const setNotification = (notification, ms = 5000) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: notification })
    setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
    }, ms)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

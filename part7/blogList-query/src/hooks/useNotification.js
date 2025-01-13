import { useContext } from 'react'
import NotificationContext, {
  setNotification,
  resetNotification,
  setTimeoutId,
} from '../contexts/NotificationContext'

const useNotification = () => {
  const [{ text, type, timeoutId }, dispatch] = useContext(NotificationContext)

  const setNotificationTimeout = (notification, ms = 5000) => {
    dispatch(setNotification(notification))
    clearTimeout(timeoutId)
    const id = setTimeout(() => clearNotification(), ms)
    dispatch(setTimeoutId(id))
  }

  const clearNotification = () => {
    dispatch(resetNotification())
  }

  return {
    notification: { text, type },
    setNotificationTimeout,
    clearNotification,
  }
}

export default useNotification

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
    const id = setTimeout(() => {
      dispatch(resetNotification())
    }, ms)
    dispatch(setTimeoutId(id))
  }

  return {
    notification: { text, type },
    setNotificationTimeout,
  }
}

export default useNotification

import { useContext } from 'react'
import NotificationContext, {
  setNotification,
  resetNotification,
  setTimeoutId,
} from '../contexts/NotificationContext'

const useNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const setNotificationTimeout = (text, type = 'success', ms = 5000) => {
    dispatch(setNotification({ type, text }))
    if (ms) {
      clearTimeout(notification.timeoutId)
      const id = setTimeout(() => clearNotification(), ms)
      dispatch(setTimeoutId(id))
    }
  }

  const setErrorNotificationTimeout = (text, ms = 5000) => {
    setNotificationTimeout(text, 'danger', ms)
  }

  const clearNotification = () => {
    dispatch(resetNotification())
  }

  return {
    notification,
    setNotificationTimeout,
    setErrorNotificationTimeout,
    clearNotification,
  }
}

export default useNotification

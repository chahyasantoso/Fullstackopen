import { useDispatch, useSelector } from 'react-redux'
import {
  setNotification,
  resetNotificationState,
} from '../reducers/notificationReducer'

export const useNotification = () => {
  return useSelector((state) => state.notification)
}

export const useNotificationDispatch = () => {
  const dispatch = useDispatch()

  const setNotificationTimeout = (text, type = 'success', ms = 5000) => {
    dispatch(setNotification({ text, type }, ms))
  }

  const setErrorNotificationTimeout = (text, ms = 5000) => {
    setNotificationTimeout(text, 'danger', ms)
  }

  const clearNotification = () => {
    dispatch(resetNotificationState())
  }

  return {
    setNotificationTimeout,
    setErrorNotificationTimeout,
    clearNotification,
  }
}

export default useNotification

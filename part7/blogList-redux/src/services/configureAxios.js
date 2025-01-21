import axios from 'axios'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userSessionReducer'

const handleError = (error, store) => {
  const text = error.response?.data?.error ?? error.message
  store.dispatch(setNotification({ text, type: 'danger' }))
  if (text.includes('token expired')) {
    store.dispatch(logoutUser())
  }
  return Promise.reject(error)
}

const configureAxios = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => handleError(error, store)
  )
}

export default configureAxios

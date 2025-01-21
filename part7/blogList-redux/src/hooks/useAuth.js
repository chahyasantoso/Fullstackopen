import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/userSessionReducer'
import { setNotification } from '../reducers/notificationReducer'

export const useAuth = () => {
  return useSelector((state) => state.userSession)
}

export const useAuthDispatch = () => {
  const dispatch = useDispatch()

  const login = async (username, password) => {
    try {
      await dispatch(loginUser(username, password))
    } catch (error) {
      dispatch(
        setNotification({ text: 'wrong username or password', type: 'danger' })
      )
    }
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  return {
    login,
    logout,
  }
}

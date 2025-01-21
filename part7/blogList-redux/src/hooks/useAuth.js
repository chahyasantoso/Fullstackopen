import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logoutUser } from '../reducers/userSessionReducer'

export const useAuth = () => {
  return useSelector((state) => state.userSession)
}

export const useAuthDispatch = () => {
  const dispatch = useDispatch()

  const login = async (username, password) => {
    await dispatch(loginUser(username, password))
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  return {
    login,
    logout,
  }
}

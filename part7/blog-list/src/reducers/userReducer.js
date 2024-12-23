import { createSlice } from '@reduxjs/toolkit'
import sessionService from '../services/userSession'
import loginService from '../services/login'

const initialState = sessionService.getSession()

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserState(state, action) {
      const user = action.payload
      sessionService.setSession(user)
      return user
    },
    logout(state, action) {
      sessionService.clearSession()
      return null
    },
  },
})

export const { setUserState, logout } = slice.actions

export const login = (username, password) => {
  return async (dispatch) => {
    const userFromLogin = await loginService.login(username, password)
    dispatch(setUserState(userFromLogin))

    return userFromLogin
  }
}

const userReducer = slice.reducer
export default userReducer

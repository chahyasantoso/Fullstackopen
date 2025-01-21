import { createSlice } from '@reduxjs/toolkit'
import sessionService from '../services/userSession'
import loginService from '../services/login'

const initialState = null

const slice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    setUserState(state, action) {
      const userSession = action.payload
      return userSession
    },
    clearUserState(state, action) {
      return null
    },
  },
})

export const { setUserState, clearUserState } = slice.actions

export const initializeUserSession = () => {
  return (dispatch) => {
    try {
      const userFromSession = sessionService.getSession()
      if (userFromSession) {
        dispatch(setUserState(userFromSession))
      }
    } catch (error) {
      dispatch(clearUserState())
    }
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const userFromLogin = await loginService.login(username, password)
    dispatch(setUserState(userFromLogin))
    sessionService.setSession(userFromLogin)
    return userFromLogin
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(clearUserState())
    sessionService.clearSession()
  }
}

const userSessionReducer = slice.reducer
export default userSessionReducer

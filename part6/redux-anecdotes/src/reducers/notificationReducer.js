import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    },
    resetNotificationState(state, action) {
      return initialState
    }
  }
})

export const { setNotificationState, resetNotificationState } = slice.actions

export const setNotification = (notification, ms) => {
  return (dispatch, getState) => {
    dispatch(setNotificationState(notification))
    setTimeout(() => {
      dispatch(resetNotificationState())
    }, ms)
  }
}

export default slice.reducer
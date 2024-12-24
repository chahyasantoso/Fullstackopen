import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: '',
  type: 'success',
}
const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState(state, action) {
      const { text, type = initialState.type } = action.payload
      return { text, type }
    },
    resetNotificationState(state, action) {
      return initialState
    },
  },
})

export const { setNotificationState, resetNotificationState } = slice.actions

export const setNotification = (notification, ms = 5000) => {
  return (dispatch) => {
    dispatch(setNotificationState(notification))
    setTimeout(() => {
      dispatch(resetNotificationState())
    }, ms)
  }
}

const notificationReducer = slice.reducer
export default notificationReducer
